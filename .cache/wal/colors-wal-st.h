const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#1f1e1d", /* black   */
  [1] = "#bdbbba", /* red     */
  [2] = "#a9a298", /* green   */
  [3] = "#a8996a", /* yellow  */
  [4] = "#a9a185", /* blue    */
  [5] = "#a5a6a6", /* magenta */
  [6] = "#3497ad", /* cyan    */
  [7] = "#c7c6c6", /* white   */

  /* 8 bright colors */
  [8]  = "#575655",  /* black   */
  [9]  = "#bdbbba",  /* red     */
  [10] = "#a9a298", /* green   */
  [11] = "#a8996a", /* yellow  */
  [12] = "#a9a185", /* blue    */
  [13] = "#a5a6a6", /* magenta */
  [14] = "#3497ad", /* cyan    */
  [15] = "#c7c6c6", /* white   */

  /* special colors */
  [256] = "#1f1e1d", /* background */
  [257] = "#c7c6c6", /* foreground */
  [258] = "#c7c6c6",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
