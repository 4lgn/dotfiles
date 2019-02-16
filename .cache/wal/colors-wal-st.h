const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#271c1c", /* black   */
  [1] = "#c7918f", /* red     */
  [2] = "#446baa", /* green   */
  [3] = "#6f77aa", /* yellow  */
  [4] = "#9f82a6", /* blue    */
  [5] = "#b8697b", /* magenta */
  [6] = "#b85061", /* cyan    */
  [7] = "#c9c6c6", /* white   */

  /* 8 bright colors */
  [8]  = "#5d5454",  /* black   */
  [9]  = "#c7918f",  /* red     */
  [10] = "#446baa", /* green   */
  [11] = "#6f77aa", /* yellow  */
  [12] = "#9f82a6", /* blue    */
  [13] = "#b8697b", /* magenta */
  [14] = "#b85061", /* cyan    */
  [15] = "#c9c6c6", /* white   */

  /* special colors */
  [256] = "#271c1c", /* background */
  [257] = "#c9c6c6", /* foreground */
  [258] = "#c9c6c6",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
