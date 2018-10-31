const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#1f1d12", /* black   */
  [1] = "#b5a57a", /* red     */
  [2] = "#a49a40", /* green   */
  [3] = "#49aa6e", /* yellow  */
  [4] = "#2388b0", /* blue    */
  [5] = "#7aa0be", /* magenta */
  [6] = "#c0babb", /* cyan    */
  [7] = "#c7c6c3", /* white   */

  /* 8 bright colors */
  [8]  = "#57554d",  /* black   */
  [9]  = "#b5a57a",  /* red     */
  [10] = "#a49a40", /* green   */
  [11] = "#49aa6e", /* yellow  */
  [12] = "#2388b0", /* blue    */
  [13] = "#7aa0be", /* magenta */
  [14] = "#c0babb", /* cyan    */
  [15] = "#c7c6c3", /* white   */

  /* special colors */
  [256] = "#1f1d12", /* background */
  [257] = "#c7c6c3", /* foreground */
  [258] = "#c7c6c3",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
