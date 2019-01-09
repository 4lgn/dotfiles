static const char norm_fg[] = "#c7c6c6";
static const char norm_bg[] = "#1f1e1d";
static const char norm_border[] = "#575655";

static const char sel_fg[] = "#c7c6c6";
static const char sel_bg[] = "#a9a298";
static const char sel_border[] = "#c7c6c6";

static const char urg_fg[] = "#c7c6c6";
static const char urg_bg[] = "#bdbbba";
static const char urg_border[] = "#bdbbba";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
