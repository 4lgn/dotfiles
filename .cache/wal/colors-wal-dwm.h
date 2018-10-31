static const char norm_fg[] = "#c7c6c3";
static const char norm_bg[] = "#1f1d12";
static const char norm_border[] = "#57554d";

static const char sel_fg[] = "#c7c6c3";
static const char sel_bg[] = "#a49a40";
static const char sel_border[] = "#c7c6c3";

static const char urg_fg[] = "#c7c6c3";
static const char urg_bg[] = "#b5a57a";
static const char urg_border[] = "#b5a57a";

static const char *colors[][3]      = {
    /*               fg           bg         border                         */
    [SchemeNorm] = { norm_fg,     norm_bg,   norm_border }, // unfocused wins
    [SchemeSel]  = { sel_fg,      sel_bg,    sel_border },  // the focused win
    [SchemeUrg] =  { urg_fg,      urg_bg,    urg_border },
};
