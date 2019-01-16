const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#1f1b17", /* black   */
  [1] = "#aa9288", /* red     */
  [2] = "#aa8369", /* green   */
  [3] = "#aa7146", /* yellow  */
  [4] = "#c6793c", /* blue    */
  [5] = "#748aaa", /* magenta */
  [6] = "#a39da5", /* cyan    */
  [7] = "#c7c6c5", /* white   */

  /* 8 bright colors */
  [8]  = "#575451",  /* black   */
  [9]  = "#aa9288",  /* red     */
  [10] = "#aa8369", /* green   */
  [11] = "#aa7146", /* yellow  */
  [12] = "#c6793c", /* blue    */
  [13] = "#748aaa", /* magenta */
  [14] = "#a39da5", /* cyan    */
  [15] = "#c7c6c5", /* white   */

  /* special colors */
  [256] = "#1f1b17", /* background */
  [257] = "#c7c6c5", /* foreground */
  [258] = "#c7c6c5",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
