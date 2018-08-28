static const char norm_fg[] = "#c4c4c7";
static const char norm_bg[] = "#14141f";
static const char norm_border[] = "#4e4e57";

static const char sel_fg[] = "#c4c4c7";
static const char sel_bg[] = "#4f4eaa";
static const char sel_border[] = "#c4c4c7";

static const char urg_fg[] = "#c4c4c7";
static const char urg_bg[] = "#2b50aa";
static const char urg_border[] = "#2b50aa";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
