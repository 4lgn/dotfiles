const char *colorname[] = {

  /* 8 normal colors */
  [0] = "#14141f", /* black   */
  [1] = "#2b50aa", /* red     */
  [2] = "#4f4eaa", /* green   */
  [3] = "#6d61ad", /* yellow  */
  [4] = "#9f6fab", /* blue    */
  [5] = "#aa5c86", /* magenta */
  [6] = "#ab4f60", /* cyan    */
  [7] = "#c4c4c7", /* white   */

  /* 8 bright colors */
  [8]  = "#4e4e57",  /* black   */
  [9]  = "#2b50aa",  /* red     */
  [10] = "#4f4eaa", /* green   */
  [11] = "#6d61ad", /* yellow  */
  [12] = "#9f6fab", /* blue    */
  [13] = "#aa5c86", /* magenta */
  [14] = "#ab4f60", /* cyan    */
  [15] = "#c4c4c7", /* white   */

  /* special colors */
  [256] = "#14141f", /* background */
  [257] = "#c4c4c7", /* foreground */
  [258] = "#c4c4c7",     /* cursor */
};

/* Default colors (colorname index)
 * foreground, background, cursor */
 unsigned int defaultbg = 0;
 unsigned int defaultfg = 257;
 unsigned int defaultcs = 258;
 unsigned int defaultrcs= 258;
