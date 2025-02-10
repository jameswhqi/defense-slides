{ config
, lib
, dream2nix
, ...
}: {
  imports = [
    # dream2nix.modules.dream2nix.nodejs-package-lock-v3
    # dream2nix.modules.dream2nix.nodejs-granular-v3
    dream2nix.modules.dream2nix.nodejs-devshell-v3
  ];

  deps = { nixpkgs, ... }: {
    inherit
      (nixpkgs)
      stdenv
      rsync
      ;
  };

  name = "defense";
  version = "0.0.1";

  mkDerivation.src = with lib.fileset; toSource {
    root = ./.;
    fileset = unions [
      ./package.json
      ./package-lock.json
    ];
  };

  # nodejs-package-lock-v3 = {
  #   packageLockFile = "${config.mkDerivation.src}/package-lock.json";
  # };
}
