{
  description = "slides";

  inputs = {
    flake-parts.url = "github:hercules-ci/flake-parts";
    purescript-overlay.url = "github:thomashoneyman/purescript-overlay";
    dream2nix.url = "github:nix-community/dream2nix";
    purifix.url = "github:purifix/purifix";
  };

  outputs = inputs@{ flake-parts, nixpkgs, purescript-overlay, dream2nix, purifix, ... }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [ "x86_64-linux" "aarch64-linux" "x86_64-darwin" "aarch64-darwin" ];
      perSystem = { self', system, ... }:
        let
          pkgs = import nixpkgs {
            inherit system;
            overlays = [ purescript-overlay.overlays.default purifix.overlay ];
          };

          node = dream2nix.lib.evalModules {
            packageSets.nixpkgs = pkgs;
            modules = [
              ./node.nix
              {
                paths.projectRoot = ./.;
                paths.projectRootFile = "flake.nix";
                paths.package = ./.;
              }
            ];
          };

          my-package = pkgs.purifix {
            src = ./.;
          };
        in
        {
          devShells.default =
            pkgs.mkShell {
              inputsFrom = [ my-package.develop ];
              packages = with pkgs; [
                purs
                spago-unstable
                purs-tidy
                purs-backend-es

                esbuild
                pscid
                nodejs

                pdf2svg
              ];
              shellHook = node.out.shellHook;
            };
          devShells.npm =
            pkgs.mkShell {
              packages = with pkgs; [
                nodejs
              ];
            };
        };
    };
}
