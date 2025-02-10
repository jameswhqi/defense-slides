module Slides
  ( (!)
  , Builder
  , BuilderM(..)
  , Change
  , ChangeItem
  , Element(..)
  , Fn(..)
  , Id
  , NodeConfig
  , NodeId(..)
  , Note
  , RelLoc(..)
  , StepConfig(..)
  , StepLocation(..)
  , Tag
  , TagT
  , TargetId(..)
  , addClasses
  , addClassesS
  , addCls
  , addShow
  , addStep_
  , alsoHide
  , alsoRmCls
  , alsoShow
  , alsoShows
  , attr
  , bAttr
  , class BAttributable
  , cls
  , clsa
  , code
  , codet
  , cShow
  , div
  , divt
  , fnote
  , hide
  , hs
  , id
  , iframe
  , img
  , inote
  , li
  , lit
  , mapAll
  , mapNth
  , mapHead
  , mapTail
  , math
  , mi
  , mn
  , mo
  , module OtherExports
  , module Prelude
  , mover
  , mr
  , mrow
  , mspace
  , msub
  , msubsup
  , msup
  , mtext
  , normalize
  , oalsoHide
  , oalsoShow
  , onote
  , ostepId
  , ostepOffset
  , overlapDiv
  , overlapDivC
  , overlapDivN
  , overlapDivW
  , overlapSpan
  , pre
  , pret
  , printSteps
  , px
  , renderSlides
  , rmcls
  , sChange
  , sChanges
  , sHide
  , sHides
  , sShow
  , sShows
  , set
  , show_
  , shows_
  , sibling
  , span
  , spant
  , stepId
  , stepOffset
  , stl
  , stylesD
  , sub
  , subt
  , table
  , tbody
  , td
  , tdt
  , text
  , th
  , tht
  , tr
  , ul
  , ul2
  ) where

import Prelude hiding (div, sub)

import Control.Alt ((<|>))
import Control.Monad.State (State, get, modify_, runState)
import Control.Semigroupoid (composeFlipped)
import Data.Array (all, concat, cons, drop, filter, findIndex, findMap, fold, foldl, head, init, insertAt, length, mapWithIndex, modifyAt, modifyAtIndices, slice, snoc, uncons, (!!), (..), (:))
import Data.Array.NonEmpty (NonEmptyArray, fold1)
import Data.Array.NonEmpty (fromArray, intersperse, singleton) as NE
import Data.Either (Either(..))
import Data.Foldable (for_, traverse_)
import Data.Function (applyFlipped)
import Data.Functor (mapFlipped)
import Data.Generic.Rep (class Generic)
import Data.Int (fromString, toNumber) as I
import Data.Maybe (Maybe(..), fromJust, fromMaybe, maybe)
import Data.Newtype (class Newtype, modify, unwrap, wrap)
import Data.Set (Set)
import Data.Set (difference, fromFoldable, toUnfoldable, union) as Set
import Data.Show.Generic (genericShow)
import Data.String (Pattern(..), Replacement(..), replaceAll, split)
import Data.Traversable (traverse)
import Data.Tuple (Tuple(..), fst, snd)
import Data.Tuple.Nested ((/\))
import Effect (Effect, foreachE)
import Effect.Timer (setTimeout)
import Effect.Uncurried (EffectFn4, mkEffectFn1, mkEffectFn4, runEffectFn2, runEffectFn4)
import Foreign (unsafeToForeign)
import Foreign.Object (Object)
import Foreign.Object (toUnfoldable, union) as O
import Literals.Null (null)
import Partial.Unsafe (unsafePartial)
import Specular.Dom.Browser (Attrs, EventType, Namespace, TagName, appendChild, createElementNS, (:=))
import Specular.Dom.Browser (Event, Node) as S
import Specular.Dom.Browser ((:=)) as OtherExports
import Specular.Dom.Builder (mkBuilder', runBuilder')
import Specular.Dom.Builder.Class (BuilderEnv, onDomEvent)
import Specular.Dom.Element (ClassName, Prop(..), attrD, attrsD, bindValueOnInput, classes, classesD, dynText, el, el', on, stopPropagation)
import Specular.Dom.Element (attr, attrs, text) as S
import Specular.Dom.Widget (RWidget, Widget, runMainWidgetInBody)
import Specular.FRP (class MonadFRP, Dynamic, Event, foldDyn, foldDynMaybe, holdDyn, leftmost, newEvent, subscribeDyn_, subscribeEvent_, withDynamic_)
import Specular.FRP.Base (uniqDynPure)
import Specular.FRP.List (dynamicListWithIndex_)
import Specular.Ref (new, read, write) as Ref
import Unsafe.Coerce (unsafeCoerce)
import Web.HTML (History, window) as H
import Web.HTML.HTMLElement (focus)
import Web.HTML.History (DocumentTitle(..), URL(..), replaceState) as H
import Web.HTML.Location (href) as H
import Web.HTML.Window (Window, document, history, innerHeight, innerWidth, location) as H
import Web.HTML.Window (localStorage)
import Web.Storage.Storage (getItem, setItem)
import Web.URL (URL, href, searchParams, setSearch, unsafeFromAbsolute) as U
import Web.URL.URLSearchParams (get, set, toString) as U

-- types --

type Size = { width :: Number, height :: Number }

data Element = Node NodeConfig | Text String

derive instance Generic Element _
instance Show Element where
  show x = genericShow x

data NodeId = AutoId | NodeId Id
data TargetId = NoId | AutoAbsId | AutoRelId (Array RelLoc) | AbsId Id | RelId Id (Array RelLoc)
data RelLoc = Sibling Int | ParentNode | NthChild Int

derive instance Eq NodeId
derive instance Generic NodeId _
instance Show NodeId where
  show = genericShow

derive instance Eq TargetId
derive instance Generic TargetId _
instance Show TargetId where
  show = genericShow

derive instance Eq RelLoc
derive instance Generic RelLoc _
instance Show RelLoc where
  show = genericShow

type NodeConfig =
  { id :: NodeId
  , tag :: TagName
  , namespace :: Maybe Namespace
  , classes :: Set ClassName
  , styles :: Attrs
  , attributes :: Attrs
  , children :: Array Element
  }

newtype StepConfig = StepConfig
  { id :: Maybe Id
  , location :: StepLocation
  , offset :: Int
  , changes :: Array ChangeItem
  , note :: Note
  }

instance Semigroup StepConfig where
  append (StepConfig a) (StepConfig b) = StepConfig
    { id: a.id <|> b.id
    , location: b.location
    , offset: a.offset + b.offset
    , changes: a.changes <> b.changes
    , note: { pre: a.note.pre <> b.note.pre, post: a.note.post <> b.note.post }
    }

instance Monoid StepConfig where
  mempty = StepConfig
    { id: Nothing
    , location: BeforeChildren
    , offset: 0
    , changes: []
    , note: { pre: "", post: "" }
    }

derive instance Newtype StepConfig _
derive instance Generic StepConfig _
instance Show StepConfig where
  show = genericShow

data StepLocation = BeforeChildren | AfterChildren | BeforeStep Id

derive instance Generic StepLocation _
instance Show StepLocation where
  show = genericShow

type Note = { pre :: String, post :: String }

type ChangeItem =
  { target :: TargetId, change :: Change }

type Change = Fn (NodeConfig -> NodeConfig)

newtype Fn a = Fn a

derive instance Newtype (Fn a) _
instance Show (Fn a) where
  show _ = "Fn"

data BuilderM :: Type -> Type
data BuilderM a
  = Concat (Array (BuilderM Unit)) a
  | Parent NodeConfig (BuilderM a)
  | Modify Change (BuilderM a)
  | Content String a
  | AddStep StepConfig (BuilderM a)
  | ModifyInnerStep (Fn (StepConfig -> StepConfig)) (BuilderM a)
  | ModifyOuterStep (Fn (StepConfig -> StepConfig)) (BuilderM a)
  | FirstNote Note a
  | PrintSteps (Array Int) a
  | Empty a

derive instance Generic (BuilderM a) _
instance Show a => Show (BuilderM a) where
  show x = genericShow x

instance Functor BuilderM where
  map f = case _ of
    Concat as a -> Concat as $ f a
    Parent n a -> Parent n $ map f a
    Modify g a -> Modify g $ map f a
    Content t a -> Content t $ f a
    AddStep s a -> AddStep s $ map f a
    ModifyInnerStep g a -> ModifyInnerStep g $ map f a
    ModifyOuterStep g a -> ModifyOuterStep g $ map f a
    FirstNote n a -> FirstNote n $ f a
    PrintSteps s a -> PrintSteps s $ f a
    Empty a -> Empty $ f a

instance Bind BuilderM where
  bind ma f =
    let
      mnb = map f ma
      nb = builderValue mnb
      b = builderValue nb
      m0 = map (const unit) ma
      n0 = map (const unit) nb
    in
      case m0 /\ n0 of
        Empty _ /\ _ ->
          nb
        _ /\ Empty _ ->
          map (const b) ma
        Concat ms _ /\ Concat ns _ ->
          Concat (ms <> ns) b
        Concat ms _ /\ _ ->
          Concat (snoc ms n0) b
        _ /\ Concat ns _ ->
          Concat (cons m0 ns) b
        _ ->
          Concat [ m0, n0 ] b

instance Apply BuilderM where
  apply f a = f >>= (\g -> map g a)

instance Applicative BuilderM where
  pure = Empty

instance Monad BuilderM

type Builder = BuilderM Unit
type Tag = Builder -> Builder
type TagT = String -> Builder
-- type BAttr = forall a. BuilderM a -> BuilderM a
type BAttr = Builder -> Builder

instance Semigroup Builder where
  append a b = a *> b

instance Monoid Builder where
  mempty = Empty unit

type SlideNum = Int
type StepNum = Int
type Id = String
type KeyName = String

type Location = { slide :: SlideNum, step :: StepNum }
type ShowNotes = Boolean
type ShowAddNote = Boolean

type Slide =
  { elements :: Array Element
  , steps :: Array StepConfig
  , firstNote :: Note
  , printSteps :: Maybe (Array Int)
  }

-- main --

renderSlides :: Array Builder -> Effect Unit
renderSlides slides =
  let
    builtSlides =
      ( \s ->
          let
            Tuple es { steps: ss, firstNote: fn, printSteps: ps } = runState (build $ normalize s)
              { id: 1, steps: [], firstNote: emptyNote, printSteps: Nothing }
          in
            { elements: es
            , steps: resolveRelIds es ss # resolveStepOrder
            , firstNote: fn
            , printSteps: ps
            }
      ) <$> slides
  in
    do
      -- logShow $ map normalize slides
      -- logShow slides
      -- logShow builtSlides
      window <- H.window
      document <- H.document window
      history <- H.history window
      initURL <- map U.unsafeFromAbsolute $ H.href =<< H.location window
      let
        initSP = U.searchParams initURL
        initLocation =
          { slide: U.get "slide" initSP >>= I.fromString # fromMaybe 1
          , step: U.get "step" initSP >>= I.fromString # fromMaybe 0
          }
        initShowNotes = U.get "shownotes" initSP # maybe false stringToBool
        stringToBool s = if s == "true" then true else false
      initWindowSize <- getWindowSize window
      runMainWidgetInBody do
        eResize <- sampleResize window
        dWindowSize <- holdDyn initWindowSize eResize
        let dScale = (\s -> min (s.width / fullWidth) (s.height / fullHeight)) <$> dWindowSize
        eKeydown <- sampleKeydown $ unsafeCoerce document
        dLocation <- foldDynMaybe (locationFolder builtSlides) initLocation eKeydown
        dShowNotes <- foldDynMaybe showNotesFolder initShowNotes eKeydown
        efAddNoteKeyDown <- newEvent
        dShowAddNote <- foldDynMaybe showAddNoteFolder false $ leftmost
          [ Left <$> eKeydown, Right <$> efAddNoteKeyDown.event ]
        subscribeDyn_ (setURL history initURL) $ Tuple <$> dLocation <*> dShowNotes
        eBeforePrint <- domEvent "beforeprint" (unsafeCoerce window)
        eAfterPrint <- domEvent "afterprint" (unsafeCoerce window)
        dPrint <-
          leftmost
            [ eBeforePrint <#> const true
            , eAfterPrint <#> const false
            ] # foldDyn const false
        rAddNote <- Ref.new ""
        let
          dSlideNum = uniqDynPure $ (\ss -> ss.slide) <$> dLocation

          dRenderSlides :: Dynamic (Array Boolean)
          dRenderSlides = Tuple <$> dSlideNum <*> dPrint <#>
            \(Tuple i p) ->
              if p then map (const true) builtSlides
              else map (const false) builtSlides
                # modifyAtIndices ((i - 2) .. i) (const true)
          renderedSlides = dynamicListWithIndex_ dRenderSlides handler
          handler sl dRender = withDynamic_ dRender
            \r ->
              if r then renderSlide builtSlides dScale dPrint dLocation dShowNotes sl
              else mempty
        Tuple addNoteInput _ <- el "div"
          [ classes [ "flex", "justify-center" ] ]
          do
            el "div"
              [ stylesD $ Tuple <$> dScale <*> dPrint <#>
                  ( \(Tuple s p) ->
                      if p then mempty
                      else "width" := px (s * fullWidth)
                        <> "height" := px (s * fullHeight)
                  )
              , classesD $ dPrint <#>
                  \p ->
                    if p then [ "flex", "flex-col" ]
                    else [ "relative" ]
              ]
              do
                renderedSlides
                el' "input"
                  [ classes
                      [ "absolute"
                      , "origin-top-left"
                      , "text-xs"
                      , "focus:outline-none"
                      , "border"
                      , "border-black"
                      ]
                  , classesD $ dShowAddNote <#>
                      \s -> if s then [] else [ "hidden" ]
                  , S.attr "type" "text"
                  , stylesD $ dScale <#>
                      ( \s -> "transform" := scale s
                          <> "top" := px ((slideHeight + slideMargin - 3.5) * s)
                          <> "left" := px (slideMargin * s)
                          <> "width" := px slideWidth
                      )
                  , bindValueOnInput rAddNote
                  , on "keydown" efAddNoteKeyDown.fire
                  ] $ pure unit
        subscribeDyn_
          ( \s ->
              if s then setTimeout 0 (focus (unsafeCoerce addNoteInput)) # void
              else pure unit
          )
          dShowAddNote
        subscribeEvent_
          ( \e ->
              case (unsafeCoerce e).key of
                "Escape" -> Ref.write rAddNote ""
                "Enter" -> do
                  storage <- localStorage window
                  oldNotes <- getItem "notes" storage <#> fromMaybe ""
                  newNotes <- Ref.read rAddNote
                  setItem "notes" (oldNotes <> newNotes <> "\n") storage
                  Ref.write rAddNote ""
                _ -> stopPropagation e
          )
          efAddNoteKeyDown.event

renderSlide
  :: Array Slide
  -> Dynamic Number
  -> Dynamic Boolean
  -> Dynamic Location
  -> Dynamic ShowNotes
  -> SlideNum
  -> Widget Unit
renderSlide builtSlides dScale dPrint dLocation dShowNotes sl_ =
  let
    sl = sl_ + 1
    dSlideNum = uniqDynPure $ (\ss -> ss.slide) <$> dLocation
    dStepNum = uniqDynPure $ dLocation <#> \l -> if l.slide == sl then l.step else 0
    slide = fromMaybe emptySlide $ builtSlides !! (sl - 1)
    nextSlide = fromMaybe emptySlide $ builtSlides !! sl
    renderD e =
      case e of
        Text t -> S.text t
        Node n ->
          let
            dNodeConfig = foldSteps n slide.steps <$> dStepNum
          in
            elNS n.namespace n.tag
              [ classesD $ dNodeConfig <#> \n' -> Set.toUnfoldable n'.classes
              , attrsD $ dNodeConfig <#> \n' ->
                  O.union n'.attributes $ "style" := formatStyles n'.styles
              ] $ traverse_ renderD n.children
    render st e =
      case e of
        Text t -> S.text t
        Node n ->
          let
            n' = foldSteps n slide.steps st
          in
            elNS n.namespace n.tag
              [ classes $ Set.toUnfoldable n'.classes
              , S.attrs $ O.union n'.attributes $ "style" := formatStyles n'.styles
              ] $ traverse_ (render st) n.children
    leftNote st =
      if st == 0 then slide.firstNote.post
      else slide.steps !! (st - 1) # fromMaybe mempty # unwrap # _.note.post
    rightNote st =
      if st == length slide.steps then nextSlide.firstNote.pre
      else slide.steps !! st # fromMaybe mempty # unwrap # _.note.pre
    printSteps_ = slide.printSteps # fromMaybe [ length slide.steps ] # filter
      (_ <= length slide.steps)
  in
    el "div"
      [ stylesD $ Tuple <$> dScale <*> dPrint <#>
          (\(Tuple s p) -> if p then mempty else "transform" := scale s)
      , classesD $ Tuple <$> dSlideNum <*> dPrint <#>
          \(Tuple sl' p) ->
            (if p || sl' == sl then [] else [ "invisible" ])
              <> (if p then [ "relative" ] else [ "absolute" ])
              <> [ "origin-top-left", "break-after-page" ]
      ]
      do
        -- slide
        withDynamic_ dPrint \p ->
          if p then
            for_ printSteps_ \st ->
              el "div"
                [ classes
                    [ "relative"
                    , "bg-white"
                    , "flex"
                    , "flex-col"
                    , "justify-center"
                    , "items-center"
                    ]
                , S.attr "style" $ formatStyles $
                    "width" := px slideWidth <> "height" := px slideHeight
                ] $ traverse_ (render st) slide.elements
          else
            el "div"
              [ classes
                  [ "absolute"
                  , "bg-white"
                  , "flex"
                  , "flex-col"
                  , "justify-center"
                  , "items-center"
                  ]
              , S.attr "style" $ formatStyles $
                  "top" := px slideMargin
                    <> "left" := px slideMargin
                    <> "width" := px slideWidth
                    <> "height" := px slideHeight
              ] $ traverse_ renderD slide.elements
        -- notes
        el "div"
          [ classesD $ Tuple <$> dPrint <*> dShowNotes <#>
              ( \(Tuple p s) -> (if p || not s then [ "hidden" ] else []) <>
                  [ "absolute"
                  , "flex"
                  , "justify-between"
                  , "text-xs"
                  ]
              )
          , S.attr "style" $ formatStyles $ "top" := px (slideMargin + slideHeight - 1.5)
              <> "left" := px slideMargin
              <> "width" := px slideWidth
          ]
          do
            el "div" [] $ dynText $ leftNote <$> dStepNum
            el "div" [] $ dynText $ rightNote <$> dStepNum

setURL :: H.History -> U.URL -> Tuple Location ShowNotes -> Effect Unit
setURL h u (Tuple l s) =
  let
    p = U.searchParams u
    p' = p
      # U.set "slide" (show l.slide)
      # U.set "step" (show l.step)
      # U.set "shownotes" (if s then "true" else "false")
    u' = U.setSearch (U.toString p') u
  in
    H.replaceState (unsafeToForeign null) (H.DocumentTitle "") (H.URL $ U.href u') h

-- FRP --

domEvent :: forall m. MonadFRP m => EventType -> S.Node -> m (Event Unit)
domEvent t n = do
  ef <- newEvent
  onDomEvent t n (\_ -> ef.fire unit)
  pure ef.event

domEventWithSample
  :: forall m a. MonadFRP m => (S.Event -> Effect a) -> EventType -> S.Node -> m (Event a)
domEventWithSample f t n = do
  ef <- newEvent
  onDomEvent t n
    ( \e -> do
        a <- f e
        ef.fire a
    )
  pure ef.event

sampleResize :: forall m. MonadFRP m => H.Window -> m (Event Size)
sampleResize w = domEventWithSample (\_ -> getWindowSize w) "resize" $ unsafeCoerce w

getWindowSize :: H.Window -> Effect Size
getWindowSize win = (\w h -> { width: I.toNumber w, height: I.toNumber h }) <$> H.innerWidth win <*>
  H.innerHeight win

sampleKeydown :: forall m. MonadFRP m => S.Node -> m (Event KeyName)
sampleKeydown = domEventWithSample (\e -> pure (unsafeCoerce e).key) "keydown"

stylesD :: Dynamic Attrs -> Prop
stylesD = attrD "style" <<< map
  ( objToArray
      >>> map (\(Tuple k v) -> k <> ":" <> v <> ";")
      >>> fold
  )

formatStyles :: Attrs -> String
formatStyles = objToArray
  >>> map (\(Tuple k v) -> k <> ":" <> v <> ";")
  >>> fold

locationFolder :: Array Slide -> KeyName -> Location -> Maybe Location
locationFolder bs key loc =
  let
    getMaxStep sl = bs !! (sl - 1) # map (_.steps >>> length) # fromMaybe 0
  in
    case key of
      "ArrowUp" -> case loc of
        { slide: 1, step: 0 } -> Nothing
        { slide: sl, step: 0 } -> Just { slide: sl - 1, step: getMaxStep $ sl - 1 }
        { step: st } -> Just loc { step = st - 1 }
      "ArrowDown" -> case loc of
        { slide: sl, step: st } | sl == length bs && st >= getMaxStep sl -> Nothing
        { slide: sl, step: st } | st >= getMaxStep sl -> Just { slide: sl + 1, step: 0 }
        { step: st } -> Just loc { step = st + 1 }
      "ArrowLeft" -> case loc of
        { slide: 1 } -> Nothing
        { slide: sl } -> Just { slide: sl - 1, step: getMaxStep $ sl - 1 }
      "ArrowRight" -> case loc of
        { slide: sl, step: st } | sl == length bs && st >= getMaxStep sl -> Nothing
        { slide: sl, step: st } | st >= getMaxStep sl -> Just
          { slide: sl + 1, step: getMaxStep $ sl + 1 }
        { slide: sl } -> Just loc { step = getMaxStep sl }
      _ -> Nothing

showNotesFolder :: KeyName -> ShowNotes -> Maybe ShowNotes
showNotesFolder key s =
  case key of
    "n" -> Just $ not s
    _ -> Nothing

showAddNoteFolder :: Either KeyName S.Event -> ShowAddNote -> Maybe ShowAddNote
showAddNoteFolder e _ =
  case e of
    Left key -> case key of
      "a" -> Just true
      "Escape" -> Just false
      _ -> Nothing
    Right ev -> case (unsafeCoerce ev).key of
      "Enter" -> Just false
      _ -> Nothing

-- building and rendering --

builderValue :: forall a. BuilderM a -> a
builderValue = case _ of
  -- Append a -> builderValue $ builderValue a
  Concat _ a -> a
  Parent _ a -> builderValue a
  Modify _ a -> builderValue a
  Content _ a -> a
  AddStep _ a -> builderValue a
  ModifyInnerStep _ a -> builderValue a
  ModifyOuterStep _ a -> builderValue a
  FirstNote _ a -> a
  PrintSteps _ a -> a
  Empty a -> a

-- Raw _ a -> a

build
  :: forall a
   . BuilderM a
  -> State
       { id :: Int
       , steps :: Array StepConfig
       , firstNote :: Note
       , printSteps :: Maybe (Array Int)
       }
       (Array Element)
build = case _ of
  -- Append a -> do
  --   ea <- build a
  --   eb <- build $ builderValue a
  --   pure $ ea <> eb
  Concat es _ -> do
    ess <- traverse build es
    pure $ concat ess
  Parent n c -> do
    { id: i } <- get
    let
      Tuple id i' =
        if n.id == AutoId then Tuple (NodeId $ mkId i) (i + 1)
        else Tuple n.id i
    modify_ _ { id = i' }
    ec <- build c
    pure [ Node n { id = id, children = ec } ]
  Content t _ -> pure [ Text t ]
  AddStep (StepConfig s) a -> case s.location of
    BeforeChildren -> do
      { steps: ss } <- get
      modify_ _ { steps = [] }
      ea <- build a
      let s' = updateTargetIds ea $ wrap s
      modify_
        ( \st ->
            let
              ss' = ss <> st.steps
            in
              st
                { steps =
                    if allNoId s' then ss'
                    else insertAt (length ss) s' ss' # fromMaybe ss'
                -- else insertAt (length ss + s.offset) s' ss' # fromMaybe ss'
                }
        )
      pure ea
    AfterChildren -> do
      ea <- build a
      let s' = updateTargetIds ea $ wrap s
      modify_
        ( \st -> st
            { steps =
                if allNoId s' then st.steps
                else insertAt (length st.steps) s' st.steps
                  -- else insertAt (length st.steps + s.offset) s' st.steps
                  # fromMaybe st.steps
            }
        )
      pure ea
    BeforeStep i -> do
      { steps: ss } <- get
      ea <- build a
      { steps: ss' } <- get
      let
        s' = updateTargetIds ea $ wrap s
        loc = findIndex (\(StepConfig st) -> st.id == Just i) ss # fromMaybe (length ss)
        ss'' = insertAt loc s' ss' # fromMaybe ss'
      -- ss'' = insertAt (loc + s.offset) s' ss' # fromMaybe ss'
      modify_ _ { steps = ss'' }
      pure ea
  ModifyOuterStep _ a -> build a
  FirstNote n _ -> do
    modify_ _ { firstNote = n }
    pure []
  PrintSteps s _ -> do
    modify_ _ { printSteps = Just s }
    pure []
  _ -> pure []

-- Append/Parent/PrependStep/AppendStep/InsertStep/Content/Empty
normalize :: forall a. BuilderM a -> BuilderM a
normalize = case _ of
  -- Append a -> Append $ map normalize $ normalize a
  Concat ms a ->
    let
      ms' = map normalize ms
      ms'' = mapFlipped ms' case _ of
        Concat ns _ -> ns
        b -> [ b ]
    in
      Concat (concat ms'') a
  Parent n a -> Parent n $ normalize a
  Modify f a ->
    normalize a # case _ of
      -- Append b -> Append $ map (normalize <<< Modify f) $ normalize $ Modify f b
      Concat ms b -> Concat (map (normalize <<< Modify f) ms) b
      Parent n b -> Parent (unwrap f n) b
      AddStep s b -> AddStep s $ normalize $ Modify f b
      ModifyOuterStep g b -> ModifyOuterStep g $ normalize $ Modify f b
      b -> b
  AddStep s a ->
    normalize a # case _ of
      -- Append b -> Append $ map (normalize <<< AddStep s) $ normalize $ AddStep s b
      Concat ms b -> Concat (map (normalize <<< AddStep s) ms) b
      ModifyOuterStep f b -> AddStep (unwrap f s) b
      b -> AddStep s b
  ModifyInnerStep f a ->
    normalize a # case _ of
      -- Append b -> Append $ map (normalize <<< ModifyInnerStep f) $ normalize $ ModifyInnerStep f b
      Concat ms b -> Concat (map (normalize <<< ModifyInnerStep f) ms) b
      AddStep s b -> AddStep (unwrap f s) b
      ModifyOuterStep g b -> ModifyOuterStep g $ normalize $ ModifyInnerStep f b
      b -> b
  ModifyOuterStep f a ->
    normalize a # case _ of
      -- Append b -> Append $ map (normalize <<< ModifyOuterStep f) $ normalize $ ModifyOuterStep f b
      Concat ms b -> Concat (map (normalize <<< ModifyOuterStep f) ms) b
      ModifyOuterStep g b -> ModifyOuterStep (wrap $ unwrap f <<< unwrap g) b
      b -> ModifyOuterStep f b
  a -> a

updateTargetIds :: Array Element -> StepConfig -> StepConfig
updateTargetIds es s =
  let
    s' = unwrap s
  in
    wrap $ s'
      { changes =
          ( \c ->
              let
                nodeId = head es
                  >>=
                    ( \e -> case e of
                        Node n -> Just n.id
                        _ -> Nothing
                    )
              in
                c
                  { target = case nodeId of
                      Just (NodeId i) ->
                        case c.target of
                          AutoAbsId -> AbsId i
                          AutoRelId loc -> RelId i loc
                          t -> t
                      _ ->
                        case c.target of
                          AutoAbsId -> NoId
                          AutoRelId _ -> NoId
                          t -> t
                  }
          ) <$> s'.changes
      }

allNoId :: StepConfig -> Boolean
allNoId s = all (\c -> c.target == NoId) (unwrap s).changes

resolveRelIds :: Array Element -> Array StepConfig -> Array StepConfig
resolveRelIds es =
  let
    fChange c = case c.target of
      RelId i loc -> fromMaybe c do
        t <- traceId i es
        i' <- getLoc t loc # getId es
        pure c { target = AbsId i' }
      _ -> c
    fStep = modify \s -> s { changes = map fChange s.changes }
  in
    map fStep

traceId :: Id -> Array Element -> Maybe (Array Int)
traceId i es =
  findMap
    ( \(Tuple j e) -> case e of
        Node n -> if n.id == NodeId i then Just [ j ] else traceId i n.children <#> cons j
        _ -> Nothing
    ) $ mapWithIndex Tuple es

getLoc :: Array Int -> Array RelLoc -> Array Int
getLoc = foldl \t loc -> case loc of
  Sibling n -> modifyAt (length t - 1) (add n) t # fromMaybe []
  ParentNode -> init t # fromMaybe []
  NthChild n -> snoc t n

getId :: Array Element -> Array Int -> Maybe Id
getId es = case _ of
  [] -> Nothing
  [ n ] -> es !! n >>= getNodeConfig >>= getNodeId
  t -> do
    ht <- uncons t
    nc <- es !! ht.head >>= getNodeConfig
    getId nc.children ht.tail

getNodeConfig :: Element -> Maybe NodeConfig
getNodeConfig = case _ of
  Node n -> Just n
  _ -> Nothing

getNodeId :: NodeConfig -> Maybe Id
getNodeId n = case n.id of
  NodeId i -> Just i
  _ -> Nothing

resolveStepOrder :: Array StepConfig -> Array StepConfig
resolveStepOrder ss =
  let
    go ss' = unsafePartial $ case findIndex fst ss' of
      Just i ->
        let
          prev = slice 0 i ss'
          current = ss' !! i # fromJust # snd # unwrap
          next = drop (i + 1) ss'
        in
          go
            if current.offset > 0 then
              prev <>
                ( insertAt current.offset (false /\ wrap current) next # fromMaybe
                    ((false /\ wrap current) : next)
                )
            else if current.offset < 0 then
              ( insertAt (length prev + current.offset) (false /\ wrap current) prev # fromMaybe
                  (snoc prev $ false /\ wrap current)
              ) <> next
            else prev <> (false /\ wrap current) : next
      Nothing -> ss'
  in
    map (Tuple true) ss # go # map snd

mkId :: Int -> String
mkId i = "_" <> show i

foldSteps :: NodeConfig -> Array StepConfig -> StepNum -> NodeConfig
foldSteps n steps step =
  let
    steps' = slice 0 step steps
  in
    case n.id of
      NodeId i -> foldl
        ( \n_ s ->
            findMap
              ( \c ->
                  if c.target == AbsId i then Just $ (unwrap c.change) n_
                  else Nothing
              )
              (unwrap s).changes
              # fromMaybe n_
        )
        n
        steps'
      _ -> n

-- elements --

defNode :: TagName -> NodeConfig
defNode t =
  { id: AutoId
  , tag: t
  , namespace: Nothing
  , classes: mempty
  , styles: mempty
  , attributes: mempty
  , children: mempty
  }

node :: TagName -> Tag
node t = Parent $ defNode t

mnode :: TagName -> Tag
mnode t = Parent (defNode t) { namespace = Just "http://www.w3.org/1998/Math/MathML" }

text :: TagT
text = replaceAll (Pattern "'") (Replacement "’")
  >>> lines
  >>> map (\l -> Content l unit)
  >>> NE.intersperse br
  >>> fold1

div :: Tag
div = node "div"

divt :: TagT
divt = div <<< text

span :: Tag
span = node "span"

spant :: TagT
spant = span <<< text

ul :: Tag
ul = node "ul" ! cls "list-disc ml-4 mr-4 my-2"

ul2 :: Tag
ul2 = node "ul" ! cls "list-[circle] mx-4"

li :: Tag
li = node "li" ! cls "my-1"

lit :: TagT
lit = li <<< text

br :: Builder
br = node "br" $ Empty unit

table :: Tag
table = node "table"

tbody :: Tag
tbody = node "tbody"

tr :: Tag
tr = node "tr"

th :: Tag
th = node "th"

tht :: TagT
tht = th <<< text

td :: Tag
td = node "td"

tdt :: TagT
tdt = td <<< text

img :: TagT
img s = node "img" ! attr ("src" := s) $ mempty

iframe :: TagT
iframe s = node "iframe" ! attr ("src" := s) $ mempty

code :: Tag
code = node "code"

codet :: TagT
codet = code <<< text

pre :: Tag
pre = node "pre"

pret :: TagT
pret = pre <<< text

sub :: Tag
sub = node "sub"

subt :: TagT
subt = sub <<< text

math :: Tag
math = mnode "math"

mi :: TagT
mi = mnode "mi" <<< text

mr :: TagT
mr t = mnode "mi" ! attr ("mathvariant" := "normal") $ text t

mo :: TagT
mo = mnode "mo" <<< text

mn :: TagT
mn = mnode "mn" <<< text

msub :: Builder -> Builder -> Builder
msub a b = mnode "msub" $ a <> b

msup :: Builder -> Builder -> Builder
msup a b = mnode "msup" $ a <> b

msubsup :: Builder -> Builder -> Builder -> Builder
msubsup a b c = mnode "msubsup" $ a <> b <> c

mover :: Builder -> Builder -> Builder
mover a b = mnode "mover" $ a <> b

mrow :: Tag
mrow = mnode "mrow"

mtext :: TagT
mtext = mnode "mtext" <<< text

mspace :: TagT
mspace s = mnode "mspace" ! attr ("width" := s) $ mempty

addStep_ :: StepConfig -> Builder
addStep_ s = AddStep s mempty

shows_ :: Array Id -> Builder
shows_ i = addStep_ $ sShows i

show_ :: Id -> Builder
show_ i = shows_ [ i ]

fnote :: String -> String -> Builder
fnote pre_ post = FirstNote { pre: pre_, post: post } unit

printSteps :: Array Int -> Builder
printSteps s = PrintSteps s unit

-- changes --

addClasses :: Array ClassName -> Change
addClasses c = wrap $ \n -> n { classes = Set.union n.classes $ set c }

addClassesS :: String -> Change
addClassesS c = addClasses $ split (Pattern " ") c

rmClasses :: Array ClassName -> Change
rmClasses c = wrap $ \n -> n { classes = Set.difference n.classes $ set c }

rmClassesS :: String -> Change
rmClassesS c = rmClasses $ split (Pattern " ") c

cHide :: Change
cHide = addClasses [ "invisible" ]

cShow :: Change
cShow = rmClasses [ "invisible" ]

-- steps --

sChanges :: Array ChangeItem -> StepConfig
sChanges c = modify (_ { changes = c }) mempty

sChange :: ChangeItem -> StepConfig
sChange c = sChanges [ c ]

sShows :: Array Id -> StepConfig
sShows ids = sChanges $ map (\i -> { target: AbsId i, change: cShow }) ids

sShow :: Id -> StepConfig
sShow i = sShows [ i ]

sHides :: Array Id -> StepConfig
sHides ids = sChanges $ map (\i -> { target: AbsId i, change: cHide }) ids

sHide :: Id -> StepConfig
sHide i = sHides [ i ]

sId :: Id -> StepConfig
sId i = modify (_ { id = Just i }) mempty

sNote :: Note -> StepConfig
sNote n = modify (_ { note = n }) mempty

-- attrs --

id :: Id -> BAttr
id i = Modify $ wrap _ { id = NodeId i }

hide :: BAttr
hide = Modify $ cHide

addShow :: BAttr
addShow = AddStep $ sChange { target: AutoAbsId, change: cShow }

cls :: String -> BAttr
cls c = Modify $ addClassesS c

clsa :: Array ClassName -> BAttr
clsa c = Modify $ addClasses c

rmcls :: String -> BAttr
rmcls c = Modify $ rmClassesS c

stl :: Attrs -> BAttr
stl s = Modify $ wrap (\n -> n { styles = O.union s n.styles })

attr :: Attrs -> BAttr
attr a = Modify $ wrap (\n -> n { attributes = O.union a n.attributes })

addCls :: String -> BAttr
addCls c = AddStep $ sChange { target: AutoAbsId, change: addClassesS c }

hs :: BAttr
hs = hide >>> addShow

addToInnerStep :: StepConfig -> BAttr
addToInnerStep s = ModifyInnerStep $ wrap (_ <> s)

addToOuterStep :: StepConfig -> BAttr
addToOuterStep s = ModifyOuterStep $ wrap (_ <> s)

alsoShow :: TargetId -> BAttr
alsoShow i = addToInnerStep $ sChange { target: i, change: cShow }

alsoShows :: Array TargetId -> BAttr
alsoShows is = addToInnerStep $ sChanges (map { target: _, change: cShow } is)

alsoHide :: TargetId -> BAttr
alsoHide i = addToInnerStep $ sChange { target: i, change: cHide }

alsoRmCls :: String -> TargetId -> BAttr
alsoRmCls c i = addToInnerStep $ sChange { target: i, change: rmClassesS c }

oalsoShow :: TargetId -> BAttr
oalsoShow i = addToOuterStep $ sChange { target: i, change: cShow }

oalsoHide :: TargetId -> BAttr
oalsoHide i = addToOuterStep $ sChange { target: i, change: cHide }

overlap :: Tag
overlap a = mapTail hideLastAndShow a ! cls "col-span-full row-span-full"

overlapDiv :: Tag
overlapDiv a = div ! cls "grid place-items-start"
  $ overlap a

overlapDivC :: Tag
overlapDivC a = div ! cls "grid place-items-center"
  $ overlap a

overlapDivW :: Tag
overlapDivW a = div ! cls "grid justify-items-start items-center"
  $ overlap a

overlapDivN :: Tag
overlapDivN a = div ! cls "grid justify-items-center items-start"
  $ overlap a

overlapSpan :: Tag
overlapSpan a = span ! cls "inline-grid"
  $ overlap a

hideLastAndShow :: BAttr
hideLastAndShow = hs >>> ModifyInnerStep
  (wrap (_ <> sChange { target: AutoRelId [ Sibling $ -1 ], change: cHide }))

inote :: String -> String -> BAttr
inote pre_ post = ModifyInnerStep $ wrap (_ <> sNote { pre: pre_, post: post })

onote :: String -> String -> BAttr
onote pre_ post = ModifyOuterStep $ wrap (_ <> sNote { pre: pre_, post: post })

stepId :: Id -> BAttr
stepId i = ModifyInnerStep $ wrap (_ <> sId i)

ostepId :: Id -> BAttr
ostepId i = ModifyOuterStep $ wrap (_ <> sId i)

stepOffset :: Int -> BAttr
stepOffset i = ModifyInnerStep $ wrap $ modify (_ { offset = i })

ostepOffset :: Int -> BAttr
ostepOffset i = ModifyOuterStep $ wrap $ modify (_ { offset = i })

-- beforeStepO :: Id -> BAttr
-- beforeStepO i = ModifyOuterStep (wrap $ _ { location = BeforeStep i })

-- helpers --

emptySlide :: Slide
emptySlide = { elements: [], steps: [], firstNote: emptyNote, printSteps: Nothing }

emptyNote :: Note
emptyNote = { pre: "", post: "" }

slideWidth :: Number
slideWidth = 570.0

slideHeight :: Number
slideHeight = 380.0

slideMargin :: Number
slideMargin = 15.0

fullWidth :: Number
fullWidth = slideWidth + slideMargin * 2.0

fullHeight :: Number
fullHeight = slideHeight + slideMargin * 2.0

px :: Number -> String
px n = show n <> "px"

scale :: Number -> String
scale s = "scale(" <> show s <> ")"

set :: forall a. Ord a => Array a -> Set a
set = Set.fromFoldable

lines :: String -> NonEmptyArray String
lines t = split (Pattern "\n") t
  # NE.fromArray
  # fromMaybe (NE.singleton "")

elNS :: forall r a. Maybe Namespace -> TagName -> Array Prop -> RWidget r a -> RWidget r a
elNS ns tagName props body = mkBuilder' $ mkEffectFn1 \env -> do
  node_ <- createElementNS ns tagName
  runEffectFn4 initElement env node_ props body

initElement :: forall r a. EffectFn4 (BuilderEnv r) S.Node (Array Prop) (RWidget r a) a
initElement = mkEffectFn4 \env node_ props body -> do
  -- mark <- runEffectFn1 ProfilingInternal.begin "el"
  result <- runEffectFn2 runBuilder' (env { parent = node_ }) body
  foreachE props \(Prop prop) ->
    runEffectFn2 prop node_ env.cleanup
  appendChild node_ env.parent
  -- runEffectFn1 ProfilingInternal.end mark
  pure result

sibling :: Int -> TargetId
sibling i = AutoRelId [ Sibling i ]

mapAll :: (Builder -> Builder) -> Builder -> Builder
mapAll f a = case normalize a of
  Concat ms _ ->
    Concat (map f ms) unit
  b -> b

mapHeadTail :: (Builder -> Builder) -> (Builder -> Builder) -> Builder -> Builder
mapHeadTail f g a = case normalize a of
  Concat ms b ->
    case uncons ms of
      Just { head: h, tail: t } -> Concat (cons (f h) (map g t)) b
      Nothing -> Concat ms b
  b -> b

mapHead :: (Builder -> Builder) -> Builder -> Builder
mapHead f = mapHeadTail f identity

mapTail :: (Builder -> Builder) -> Builder -> Builder
mapTail = mapHeadTail identity

mapNth :: Int -> (Builder -> Builder) -> Builder -> Builder
mapNth i f a = case normalize a of
  Concat ms _ ->
    Concat (modifyAt i f ms # fromMaybe ms) unit
  Parent n (Concat ms _) ->
    Parent n (Concat (modifyAt i f ms # fromMaybe ms) unit)
  b -> b

objToArray :: forall a. Object a -> Array (Tuple String a)
objToArray = O.toUnfoldable

class BAttributable a where
  bAttr :: a -> BAttr -> a

instance BAttributable Builder where
  bAttr = applyFlipped

instance BAttributable (Builder -> Builder) where
  bAttr = composeFlipped

infixr 9 bAttr as !
