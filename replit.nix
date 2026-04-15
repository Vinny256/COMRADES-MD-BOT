{ pkgs }: {
  deps = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.ffmpeg
    pkgs.python3
    pkgs.pkg-config
    pkgs.libuuid
    pkgs.libglvnd
    pkgs.fontconfig
    pkgs.pixman
    pkgs.cairo
    pkgs.pango
  ];
  env = {
    LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [
      pkgs.libuuid
      pkgs.libglvnd
    ];
  };
}
