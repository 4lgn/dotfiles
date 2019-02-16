static const char norm_fg[] = "#c9c6c6";
static const char norm_bg[] = "#271c1c";
static const char norm_border[] = "#5d5454";

static const char sel_fg[] = "#c9c6c6";
static const char sel_bg[] = "#446baa";
static const char sel_border[] = "#c9c6c6";

static const char urg_fg[] = "#c9c6c6";
static const char urg_bg[] = "#c7918f";
static const char urg_border[] = "#c7918f";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
