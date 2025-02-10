module Main where

import Slides

import Data.Array (foldMap, foldl, (..))
import Effect (Effect)

-- slides --

slides :: Array Builder
slides =
  let
    wtrdef = math do
      mi "u"
      mo "="
      msub (mi "w") (mr "s")
      mo "+"
      lambda ! cls "text-red-600"
      msub (mi "w") (mr "t")
    lambdaSlider = div ! cls "w-full" ! stl ("height" := (show (255.0 * 0.6) <> "px"))
      $ iframe "https://experiments.evullab.org/lambda-slider/"
          ! cls "h-[255px] origin-top-left scale-[.6]"
          ! stl ("width" := (show (100.0 / 0.6) <> "%"))
  in
    [ cls "my-1" do
        divt "Understanding the representation and dynamics\nof welfare tradeoff ratios"
          ! cls "font-medium text-xl text-center"
        divt "Wenhao (James) Qi"
        divt "2024-12-06"
    , do
        titlet "overview"
        ul $ hs do
          lit "human society is built on cooperative relationships"
          li do
            text "maximize total welfare"
            math ! cls "ml-4" ! hs $ do
              mi "u"
              mo "="
              msub (mi "w") (mr "s")
              mo "+"
              msub (mi "w") (mr "t")
          li do
            text "defectors"
            math ! cls "ml-4" $ do
              mi "u"
              mo "="
              msub (mi "w") (mr "s")
          li do
            text "subtle defectors"
            span ! hs $ do
              wtrdef ! cls "mx-4"
              text "e.g."
              math ! cls "ml-2" $ do
                lambda ! cls "text-red-600"
                mo "="
                mn "0.8"
          li $ spant "welfare tradeoff ratio (WTR)" ! cls "text-red-600"
          lit "detect subtle defection — infer WTR"
          lit "punish subtle defection — adjust WTR"
          lit "people can use, infer, and adjust WTRs"
    , do
        titlet "studying representation and dynamics of WTRs"
        ul $ hs do
          lit "behavioral"
          ul2 $ mapTail hs do
            lit "how do people set, infer, and adjust WTRs?"
            li do
              text "accurate and efficient measure of WTRs"
              spant " — Chapter 1" ! hs
          lit "evolutionary"
          ul2 $ mapTail hs do
            lit "what game environments allow WTR inference and\nadjustment to evolve?"
            li do
              text "Chapter 2 — "
              span ! cls "inline-block align-top" $ do
                text "inference alone "
                spant "in games\nw/ strong interdependence" ! hs
            li do
              text "Chapter 3 — "
              spant "inference and reciprocity in games\nw/o strong interdependence"
                ! cls "inline-block align-top"
    -- , outline ShowByStep
    , outline $ Highlight 0 false
    , do
        title do
          spant "from " ! hide ! id "f"
          text "binary allocation tasks"
          spant " to Lambda Slider" ! hide ! id "t"
        div wtrdef ! cls "my-1" ! hs
        overlapDiv ! hs ! cls "w-3/4 mt-3 mr-10"
          -- $ mapNth 6 (onote "" "triple-dom")
          $ imgs "binary" "svg" 8 ! cls "w-full"
        shows_ [ "f", "t" ]
    , do
        titlet "Lambda Slider"
        lambdaSlider ! cls "mt-3"
    , do
        titlet "psychometric properties of the Lambda Slider"
        div ! cls "flex justify-evenly items-start mt-2" $ hs do
          img "fig/list.png" ! cls "w-[50%]" ! onote "in-order-to-elicit" ""
          img "fig/rank.png" ! cls "w-[40%]"
        div ! cls "flex justify-evenly items-center" $ hs do
          img "fig/slide.png" ! cls "w-[40%]" ! onote "" "expt-3-maui"
          img "fig/donate.png" ! cls "w-[40%]"
    , do
        titlet "psychometric properties of the Lambda Slider"
        div ! cls "flex justify-evenly w-full my-1" $ hs do
          div ! cls "flex flex-col items-center gap-1" $ do
            divt "test—retest reliability" ! cls "text-sm"
            img "fig/tr.svg" ! cls "h-36"
          div ! cls "flex flex-col items-center gap-1" $ do
            divt "convergent validity w/ SVO Slider" ! cls "text-sm"
            img "fig/convergent.svg" ! cls "h-36"
        div ! cls "flex justify-evenly w-full" $ hs do
          div ! cls "flex flex-col items-center gap-1" $ do
            divt "convergent validity w/ social distance" ! cls "text-sm"
            img "fig/dist.svg" ! cls "h-36"
          div ! cls "flex flex-col items-center gap-1" $ do
            divt "external validity w/ donation" ! cls "text-sm"
            img "fig/donate.svg" ! cls "h-36"
    , outline $ Highlight 0 true
    , outline $ Highlight 1 false
    , do
        titlet "the evolution of WTR inference"
        div ! cls "flex items-center" $ do
          ul ! rmcls "mr-4" $ hs do
            lit "evolutionary game theory"
            lit "in what game environments is WTR inference useful?" ! onote "what-evolved" "on-wtr"
            li do
              text "one-shot games"
              spant " (e.g. Prisoner's Dilemma)" ! hs ! stepOffset 2 ! alsoShow (AbsId "fixed")
            ul2 ! ostepOffset 7 $ do
              li do
                spant "variable" ! cls "italic"
                text " opponent, "
                spant "fixed" ! cls "italic"
                text " payoff structure"
            li do
              text "repeated games"
              spant " (e.g. iterated Prisoner's Dilemma)" ! hs
            ul2 ! ostepOffset 4 $ do
              li do
                spant "stable" ! cls "italic"
                text " opponent, "
                spant "fixed" ! cls "italic"
                text " payoff structure"
            li do
              text "action-level strategies suffice"
              spant " (e.g. defect; tit-for-tat)" ! hs
            li ! oalsoShow (AbsId "var") $ do
              spant "variable" ! cls "italic"
              text " payoff structure?"
            li do
              spant "fixed/stable/variable" ! cls "italic"
              text " opponent/payoff structure"
          div ! cls "flex flex-col items-center gap-2" $ do
            img "fig/game-fixed.svg" ! cls "h-28" ! hide ! id "fixed"
            img "fig/game-var.svg" ! cls "h-28" ! hide ! id "var"
    , do
        titlet "expanding the space of environments"
        overlapDiv ! hs ! cls "w-3/4 mt-2"
          $ imgs "tom-space" "svg" 3 ! cls "w-full"
    , do
        titlet "agents"
        ul $ hs do
          lit "tit-for-tat (TfT)"
          ul2 $ mapTail hs do
            lit "first chooses A"
            li do
              text "then copies opponent's previous "
              spant "action" ! cls "font-semibold"
          lit "reinforcement-learning (RL)"
          ul2 do
            li do
              text "learns policy over "
              spant "actions" ! cls "font-semibold"
          lit "theory-of-mind (ToM)"
          ul2 $ mapTail hs do
            lit "performs Bayesian inference on opponent's WTR"
            lit "predicts opponent's actions"
            lit "makes best response"
    , do
        titlet "pairwise mean payoff matrices"
        img "fig/tom-matrix.svg" ! cls "w-5/6 mt-3"
    , do
        titlet "evolutionary dynamics"
        img "fig/tom-evo.svg" ! cls "w-3/5 mt-2"
    , do
        titlet "Chapter 2 discussion"
        ul $ hs do
          lit "people are sensitive to variable payoff structures\nand can infer opponent's WTR"
          lit "key environmental feature:\nsocial situations change faster than social partners"
          lit
            "ToM makes better predictions of the opponent's actions,\nallowing it to choose better options for itself"
          lit "this relies on games with strong interdependence"
        img "fig/game-nondecomp.svg" ! cls "h-28" ! hs
    , outline $ Highlight 1 true
    , outline $ Highlight 2 false
    , do
        titlet "games without strong interdependence"
        ul $ hs do
          lit "in Chapter 2, ToM's advantage relies on games\nwith strong interdependence"
            ! oalsoShow (AbsId "n")
          lit "such games may be rare in the real world"
          lit "most social decisions are one-player games"
          show_ "o"
          show_ "w"
          lit "decision only depends on current WTR"
          lit
            "what conditions allow WTR inference to evolve in these games?"
          li do
            text "WTR inference might be useful because it enables "
            spant "reciprocity" ! cls "font-semibold"
        div ! cls "flex gap-12 items-center" $ do
          img "fig/game-nondecomp.svg" ! cls "h-28" ! hide ! id "n"
          img "fig/game-onehigh.svg" ! cls "h-28" ! hide ! id "o"
          wtrdef ! hide ! id "w"
    , do
        titlet "game environment"
        ul $ hs do
          li do
            spant "stable" ! cls "italic"
            text " opponent, "
            spant "variable" ! cls "italic"
            text " payoff structure"
          lit "variable alternating games" ! oalsoShow (AbsId "o")
          lit "Exp. 1: without noise"
          lit "Exp. 2: with noise in payoffs"
          ul2 $ mapTail hs do
            lit "actor perceives actual payoffs"
            lit "observer perceives payoffs plus random noise"
        img "fig/game-one.svg" ! cls "h-28" ! hide ! id "o"
    , do
        titlet "agents"
        div ! cls "absolute top-[15%] left-[62%] text-xs" $ do
          div ! hide ! id "s" $ do
            math $ msub lambda (mr "self")
            text " — agent's WTR toward opponent"
          div ! hide ! id "o" $ do
            math $ msub lambda (mr "opp")
            text " — opponent's WTR toward agent"
        ul $ hs do
          li ! oalsoShow (AbsId "s") $ do
            text "always defect (AllD)"
            math ! cls "ml-8" $ msub lambda (mr "self") <> mo "=" <> mn "0"
          li do
            text "always cooperate (AllC)"
            math ! cls "ml-8" $ msub lambda (mr "self") <> mo "=" <> mn "1"
          li do
            text "half cooperate (HalfC)"
            math ! cls "ml-8" $ msub lambda (mr "self") <> mo "=" <> mn "0.5"
          li do
            text "tit-for-tat (TfT)"
            span ! cls "ml-8" ! hs ! alsoShow (AbsId "o") $ do
              text "binary "
              math $ msub lambda (mr "opp")
              spant "binary " ! cls "ml-4"
              math $ msub lambda (mr "self")
          div ! cls
            "grid grid-rows-[repeat(2,auto)] grid-cols-[repeat(2,max-content)] grid-flow-col items-baseline"
            $ mapTail hs
            $ cls "mx-4 list-[circle]"
            $ rmcls "my-1" do
                li do
                  text "assumes "
                  math $ msub lambda (mr "opp") <> mo "=" <> mn "0"
                  text " or "
                  math $ mn "1"
                li do
                  text "starts with "
                  math $ msub lambda (mr "self") <> mo "=" <> mn "1"
                li do
                  text "sets "
                  math $ msub lambda (mr "self") <> mo ":=" <> msub (mover lambda (mo "^"))
                    (mr "opp")
                lit "can be implemented as a heuristic"
          -- li ! cls "text-gray-400" $ do
          --   text "generous tit-for-tat (GTfT): unconditionally cooperates with "
          --   math $ mi "p"
          -- li ! cls "text-gray-400" $ do
          --   text "naive tit-for-tat (NTfT): "
          --   span do
          --     math $ msubsup (mi "w") (mr "self") (mr "chosen") <> mo ">"
          --       <> msubsup (mi "w") (mr "self") (mr "unchosen")
          --       <> rdblarrow
          --     text "cooperated"
          -- lit "generous naive tit-for-tat (GNTfT)" ! cls "text-gray-400"
          li ! rmcls "my-1" ! cls "mt-2" $ do
            text "Bayesian"
            span ! cls "ml-8" ! hs $ do
              text "graded "
              math $ msub lambda (mr "opp")
              spant "graded " ! cls "ml-4"
              math $ msub lambda (mr "self")
          div ! cls
            "grid grid-rows-[repeat(2,auto)] grid-cols-[repeat(2,max-content)] grid-flow-col items-baseline"
            $ mapTail hs
            $ cls "mx-4 list-[circle]"
            $ rmcls "my-1" do
                li do
                  text "performs Bayesian inference on "
                  math $ msub lambda (mr "opp")
                li do
                  text "starts with "
                  math $ msub lambda (mr "self") <> mo "=" <> mn "1"
                li do
                  text "sets "
                  math $ msub lambda (mr "self") <> mo ":=" <> msub (mover lambda (mo "^"))
                    (mr "opp")
                li do
                  text " with bias toward "
                  math $ mn "1"
          li ! rmcls "my-1" ! cls "mt-2" $ do
            text "slow tit-for-tat (STfT)"
            span ! cls "ml-8" ! hs $ do
              text "binary "
              math $ msub lambda (mr "opp")
              spant "graded " ! cls "ml-4"
              math $ msub lambda (mr "self")
          ul2 do
            li ! rmcls "my-1" $ do
              text "under-adjusts "
              math $ msub lambda (mr "self")
    , do
        titlet "no noise — pairwise mean payoff matrix"
        img "fig/matrix1.svg" ! cls "h-5/6 mt-1"
    , do
        titlet "no noise — evolutionary distributions"
        overlapDiv ! mapTail hs ! cls "h-5/6 mt-1" $ do
          imgs "distr1" "svg" 4 ! cls "h-full"
        ul ! cls "absolute left-[55%] top-[50%]" ! hs ! stepOffset (-2) $ do
          lit "graded WTR inference\nunlikely to evolve\ndue to TfT's simplicity"
    , do
        titlet "with noise — pairwise mean payoff matrix"
        img "fig/matrix2.svg" ! cls "h-5/6 mt-1"
    , do
        titlet "with noise — evolutionary distributions"
        overlapDiv ! mapTail hs ! cls "h-5/6 mt-1"
          $ imgs "distr2" "svg" 4 ! cls "h-full"
        ul ! cls "absolute left-[55%] top-[45%]" $ hs do
          lit "TfT suffers from misperception" ! ostepOffset (-2)
          li ! ostepOffset (-2) $ do
            text "Slow TfT performs worse than Bayesian, esp. against HalfC, due to binary "
            math $ msub lambda (mr "opp")
          lit "HalfC performs well, esp. under higher mutation rates" ! ostepOffset (-1)
    , do
        titlet "Chapter 3 discussion"
        ul $ hs do
          lit
            "graded WTR inference and reciprocity performs well,\nbut has a decisive advantage only when there's noise"
          lit "key environmental feature:\nuncertainty about payoffs others perceive"
          lit "good performance of AllD and HalfC"
          lit "complexity and optimality of the Bayesian agent"
    , outline $ Highlight 2 true
    , outline ShowAll
    , do
        titlet "future directions"
        ul ! cls "pb-20" $ hs do
          lit "fine-grained patterns of people's reciprocity in WTRs"
          ul2 do
            lit "manipulate partner's level of reciprocity"
            lit "2D presentation of the Lambda Slider" ! hs ! alsoShow (AbsId "b")
          lit "variability in parochialism"
            ! oalsoHide (AbsId "b")
            ! oalsoShow (AbsId "d")
          li do
            text "extreme WTRs ("
            math $ mo "<" ! attr ("lspace" := "0px") <> mn "0"
            text " or "
            math $ mo ">" ! attr ("lspace" := "0px") <> mn "1"
            text ")"
          lit "other social motivations (inequity aversion, social norms, etc.)"
            ! oalsoHide (AbsId "d")
          ul2 do
            lit "measurement & evolution"
        img "fig/binary/8.svg" ! cls "absolute h-[40%] top-[55%]" ! hide ! id "b"
        img "fig/dist.svg" ! cls "absolute h-[40%] top-[55%]" ! hide ! id "d"
    , mapTail hs do
        titlet "acknowledgements" ! cls "my-3"
        div ! cls "flex gap-7 my-3" $ do
          divt "Ed Vul"
          divt "Lindsey Powell"
        div ! cls "flex gap-7 my-3" $ do
          divt "Mike McCullough"
          divt "Judy Fan"
          divt "Joel Sobel"
          divt "Chujun Lin"
        divt "Boyu Wang" ! cls "my-3"
        div ! cls "flex gap-7 my-3" $ do
          divt "Erik"
          divt "Lauren O."
          divt "Isabella"
          divt "Cameron"
          divt "Alexis"
          divt "Lauren S."
          divt "Bill"
        div ! cls "flex gap-7 my-3" $ do
          divt "Yang"
          divt "Haoliang"
          divt "Yuyao"
        div ! cls "flex gap-7 my-3" $ do
          divt "mom"
          divt "dad"
          divt "Peipei"
    , img "fig/backup/1-binary.svg" ! cls "w-full"
    , img "fig/backup/1-slider.svg" ! cls "h-full"
    , img "fig/backup/1-svo.svg" ! cls "w-full"
    , img "fig/backup/1-tr.svg" ! cls "w-full"
    , img "fig/backup/1-dist.svg" ! cls "h-full"
    , img "fig/backup/1-expt2sliders.svg" ! cls "w-full"
    , img "fig/backup/1-chi.svg" ! cls "w-full"
    , img "fig/backup/1-expt3sliders.svg" ! cls "w-full"
    , img "fig/backup/1-ineq.svg" ! cls "h-full"
    , img "fig/backup/2-fig1.svg" ! cls "h-full"
    , img "fig/backup/2-fig2.svg" ! cls "h-full"
    , img "fig/backup/2-fig3.svg" ! cls "h-full"
    , img "fig/backup/2-fig4.svg" ! cls "w-full"
    , img "fig/backup/2-figa1.svg" ! cls "w-full"
    , img "fig/backup/3-decomp.svg" ! cls "w-full"
    , img "fig/backup/3-matrix1.svg" ! cls "w-full"
    , img "fig/backup/3-traces1.svg" ! cls "w-full"
    , img "fig/backup/3-matrix2.svg" ! cls "w-full"
    , img "fig/backup/3-traces2.svg" ! cls "w-full"
    ]

data OutlineConfig = ShowByStep | ShowAll | Highlight Int Boolean

outline :: OutlineConfig -> Builder
outline c =
  let
    tdl t = tdt t ! cls "text-right px-2 py-1 font-medium align-top"
    -- tdr t = tdt t ! cls "px-2 py-1 align-top"
    tdr t1 t2 = td ! cls "px-2 py-1 align-top" $ do
      text t1
      divt t2 ! cls "text-xs w-96 mt-1" ! hide
    f = case c of
      ShowByStep -> hs
      ShowAll -> mapAll $ mapNth 1 (mapNth 1 (Modify cShow))
      Highlight i s ->
        let
          prev =
            if i > 0 then 0 .. (i - 1)
              # map (\j -> mapNth j (mapNth 1 (mapNth 1 (Modify cShow))))
              # foldl (>>>) identity
            else identity
        in
          cls "opacity-30" >>> prev >>> mapNth i
            ( rmcls "opacity-30" >>>
                if s then
                  AddStep $ sChange { target: AutoRelId [ NthChild 1, NthChild 1 ], change: cShow }
                else identity
            )
  in
    do
      divt "Understanding the representation and dynamics\nof welfare tradeoff ratios"
        ! cls "font-medium text-lg text-center"
      table ! cls "my-2" $ do
        tbody $ f do
          tr do
            tdl "Chapter 1"
            tdr "an accurate and efficient measure of WTRs"
              "Wenhao Qi, Ed Vul, Lindsey Powell (under review). An accurate and efficient measure of welfare tradeoff ratios. PLOS One."
          tr do
            tdl "Chapter 2"
            tdr "the evolution of WTR inference"
              "Wenhao Qi, Ed Vul (2022). The evolution of theory of mind on welfare tradeoff ratios. Evolution and Human Behavior."
          tr do
            tdl "Chapter 3"
            tdr "the joint evolution of WTR inference and reciprocity"
              "Wenhao Qi, Boyu Wang, Lindsey Powell (in preparation). The joint evolution of theory of mind and reciprocity in noisy games."

-- main --

main :: Effect Unit
main =
  -- logShow $ 3 .. 1
  renderSlides slides

title :: Tag
title = div ! cls "font-semibold text-lg"

titlet :: TagT
titlet = title <<< text

chtitle :: String -> String -> Builder
chtitle t1 t2 = div do
  divt t1
  divt t2 ! cls "font-semibold text-lg"

refs :: Tag
refs = div ! cls "absolute left-2 bottom-1 text-xxs"

imgs :: String -> String -> Int -> Builder
imgs name suffix n = foldMap (\i -> img $ "fig/" <> name <> "/" <> show i <> "." <> suffix) $ 1 .. n

-- symbols --

lambda :: Builder
lambda = mi "λ"

rho :: Builder
rho = mi "ρ"

lrdblarrow :: Builder
lrdblarrow = mo "⇔"

rdblarrow :: Builder
rdblarrow = mo "⇒"

elof :: Builder
elof = mo "∈"

times :: Builder
times = mo "×"

minus :: Builder
minus = mo "−"

-- helpers --
