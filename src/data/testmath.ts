// import { Question } from "./tests";

// // ───────────── Math — 1-modul ─────────────
// const c = string;
// const m1: Question[] = [
//   {
//     text: "A chess set comes with 32 pieces and a checkers set comes with 24 pieces. If a board game club decides to buy a chess sets and b checkers sets, which of the following expressions represents how many more chess pieces than checkers pieces they will receive?",
//     choices: c("32a - 24b", "32b - 24a", "32a + 24b", "56a - 56b"),
//     answer: "A",
//   },
//   {
//     text: "Which of the following is equal to 2^(-5) / 2^(-3)?",
//     choices: c("1 / 2^8", "1 / 4", "4", "2^15"),
//     answer: "B",
//   },
//   {
//     text: "If 4b = 7, what is the value of 12b - 3?",
//     choices: c("18", "21", "24", "27"),
//     answer: "A",
//   },
//   {
//     text: "Which of the following is equivalent to the expression (2a^2b - 3ab^2 + ab) / ab?",
//     choices: c("2a^2b - 3ab^2 + 1", "2a^2b - 3b + ab", "2a - 3ab^2 + ab", "2a - 3b + 1"),
//     answer: "D",
//   },
//   {
//     text: "John is a member of a recreational bowling league. His bowling scores from 2006 to 2015 can be modeled by the equation p = 80.5 + 16.8t, where t represents the number of years since he joined the league in 2006 and p represents the average number of points he scored per game. Which of the following is the best interpretation of the number 16.8 in the equation?",
//     choices: c(
//       "The total number of points John scored in 2006",
//       "The average number of points John scored per game in 2006",
//       "The yearly increase in the average number of points John scored per game",
//       "The average number of games John played each year"
//     ),
//     answer: "C",
//   },
//   {
//     text: "If c^(-1/3) = x, where c > 0 and x > 0, which of the following equations gives c in terms of x?",
//     choices: c("c = -x^3", "c = cbrt(x)", "c = 1 / cbrt(x)", "c = 1 / x^3"),
//     answer: "D",
//   },
//   {
//     text: "An apartment complex charges tenants $3.50 per 1,000 gallons of water used and $12.00 for trash removal each month. Which of the following expressions represents a tenant's total monthly charges, in dollars, for g gallons of water used and trash removal?",
//     choices: c("0.00035g + 12", "0.0035g + 12", "0.035g + 12", "3.50g + 12"),
//     answer: "B",
//   },
//   {
//     // img: IMG + "m1-8.png",
//     text: "The function y = f(x), defined for -3 <= x <= 4, is graphed in the xy-plane above. Which of the following gives all values of x for which f(x) is negative?",
//     choices: c(
//       "-3 <= x <= 4",
//       "-2 < x <= 4",
//       "-2 < x < 0 and 3 < x <= 4",
//       "-3 <= x < -2 and 0 < x < 3"
//     ),
//     answer: "C",
//   },
//   {
//     text: "A factory ships boxes of calculators to schools. Each shipment can be modeled by the equation w = 0.3n + 2, where w is the total weight of the shipment, in pounds, and n is the number of calculators in the shipment. Which of the following could be the meaning of the number 2 in the equation?",
//     choices: c(
//       "The weight of the box used in each shipment",
//       "The weight of each calculator",
//       "The minimum number of calculators in each shipment",
//       "The average weight of each shipment"
//     ),
//     answer: "A",
//   },
//   {
//     text: "If 8a^2 = 3(a^2 + b) and b != 0, what is the value of a^2 / b?",
//     choices: c("1/5", "3/5", "5/3", "5"),
//     answer: "B",
//   },
//   {
//     text: "Two restaurants x miles away from each other are positioned a inches apart on a certain map that is drawn to scale. What is the distance, in inches, on the map between two restaurants that are y miles apart?",
//     choices: c("a / (xy)", "xy / a", "ay / x", "ax / y"),
//     answer: "C",
//   },
//   {
//     // img: IMG + "m1-12.png",
//     text: "Right triangle ABC is shown in the xy-plane above. What is the value of tan A?",
//     choices: c("7/12", "3/4", "7/9", "12/7"),
//     answer: "A",
//   },
//   {
//     text: "Bob can finish painting a house in 4 days. Carl can finish painting a house in 6 days. Which of the following equations can be used to find the number of days d that Bob and Carl would need to finish painting one house working together?",
//     choices: c("d/4 + d/6 = 1", "4/d + 6/d = 1", "d/4 + d/6 = 12", "4/d + 6/d = 12"),
//     answer: "A",
//   },
//   {
//     text: "When 5x + 3 is divided by x + m, where m is a constant, the result can be written as 5 + r / (x + m). What is r in terms of m?",
//     choices: c("3 - 5m", "3m - 5", "5m + 3", "8m"),
//     answer: "A",
//   },
//   {
//     passage: "-2x + 6y = 10\n-3x + 9y = 18",
//     text: "How many solutions (x, y) are there to the system of equations above?",
//     choices: c("Zero", "One", "Two", "More than two"),
//     answer: "A",
//   },
//   {
//     text: "If 2(b - 3) - 3(2b + 5) = -33, what is the value of b?",
//     choices: c("3", "6", "9", "12"),
//     answer: "A",
//   },
//   {
//     text: "For what value of k is 5 - 6/k = -13?",
//     choices: c("3", "1/3", "6", "1/6"),
//     answer: "B",
//   },
//   {
//     text: "The graph of a line in the xy-plane passes through points (0, 0) and (1, 2). The graph of a second line passes through points (1, 2) and (k, 0). If the two lines are perpendicular, what is the value of k?",
//     choices: c("2", "3", "5", "10"),
//     answer: "C",
//   },
//   {
//     passage: "x^2 + 2xy + y^2 = 25\nx - y = 7",
//     text: "If (x, y) is a solution to the system of equations above, what is one possible value of x?",
//     choices: c("2", "4", "5", "1"),
//     answer: "D",
//   },
//   {
//     text: "A clothing store carries red ties and blue ties. The number of red ties in stock is 40 less than three times the number of blue ties in stock. If there are 10 more red ties than blue ties in stock, how many blue ties are in stock?",
//     choices: c("5", "15", "20", "25"),
//     answer: "D",
//   },
//   {
//     // img: IMG + "m1-21.png",
//     text: "In triangle ABD above, AC = 5 and BD = 10. What is the length of CD?",
//     choices: c("5*sqrt(2)", "5*sqrt(3)", "6", "6*sqrt(2)"),
//     answer: "B",
//   },
//   {
//     // img: IMG + "m1-22.png",
//     text: "The graph of the equation y = -x^2 + 6x + 16 is a parabola with vertex (3, 25) as shown in the xy-plane above. If one of the x-intercepts is at -2, which of the following equivalent forms of the equation shows the x-intercepts of the parabola as constants or coefficients?",
//     choices: c(
//       "y = -2(x + 2)(x - 8)",
//       "y = -(x + 2)(x - 8)",
//       "y = (x + 2)(x - 8)",
//       "y = -(x - 3)^2 + 25"
//     ),
//     answer: "B",
//   },
// ];

// // ───────────── Math — 2-modul ─────────────
// const m2: Question[] = [
//   {
//     text: "If y + 3/5 = 27/35, then what is the value of y?",
//     choices: c("-6/35", "6/35", "4/5", "48/35"),
//     answer: "B",
//   },
//   {
//     text: "At a bookstore, each magazine costs the same price. If 8 magazines cost d dollars, then which of the following expresses the number of magazines that can be purchased for 15 dollars?",
//     choices: c("15d / 8", "d / 120", "120 / d", "8d / 15"),
//     answer: "C",
//   },
//   {
//     text: "Line m is graphed in the xy-plane. If an equation for line m is 6y + 2x = 5, which of the following statements is true?",
//     choices: c(
//       "Line m has a slope of -3.",
//       "Line m has a slope of 1/3.",
//       "The x-intercept of line m is 5/2 and the y-intercept is 5/6.",
//       "The x-intercept of line m is 5/6 and the y-intercept is 5/2."
//     ),
//     answer: "C",
//   },
//   {
//     text: "If 3*sqrt(x^3) = sqrt(72), what is the value of x?",
//     choices: c("2", "3", "4", "5"),
//     answer: "A",
//   },
//   {
//     passage: "(x - c)^2 = x + 3",
//     text: "If c = 3, what is the solution set of the equation above?",
//     choices: c("{1}", "{6}", "{1, 6}", "{-3, 1, 6}"),
//     answer: "C",
//   },
//   {
//     // img: IMG + "m2-6.png",
//     text: "The graph of f(x) is shown in the xy-plane above. If f(a) = -2, which of the following is a possible value of a?",
//     choices: c("-1.5", "-0.5", "1", "2"),
//     answer: "B",
//   },
//   {
//     text: "Anna writes checks from her checkbook to pay her business expenses. The number of checks c left in her checkbook after t weeks is given by the equation c = 120 - 2t. What is the meaning of the number 120 in the equation?",
//     choices: c(
//       "The number of checks Anna writes each week",
//       "The number of weeks it takes for Anna to write all the checks in her checkbook",
//       "The number of checks left in Anna's checkbook at the end of one week",
//       "The initial number of checks in Anna's checkbook"
//     ),
//     answer: "D",
//   },
//   {
//     passage: "sqrt(1 / (2x)) - 2 = 3",
//     text: "If x != 0, for what real value of x is the equation above true?",
//     choices: c("1/50", "1/22", "2/25", "1/2"),
//     answer: "A",
//   },
//   {
//     text: "An online office supply store sells pens at p dollars per box and offers free shipping on orders of $75 or more. If John decides to order new pens from this store, which of the following inequalities expresses the number of boxes n that he must purchase for the order to qualify for free shipping?",
//     choices: c("n <= p / 75", "n >= p / 75", "n <= 75 / p", "n >= 75 / p"),
//     answer: "D",
//   },
//   {
//     passage: "(3(-h + 3) + 2) / 4 = (5 - (1 - 2h)) / 10",
//     text: "In the equation above, what is the value of h?",
//     choices: c("43/19", "47/19", "47/14", "47/11"),
//     answer: "B",
//   },
//   {
//     passage: "3x + 5y = 10\n-x + y = 2",
//     text: "Which of the following ordered pairs (x, y) satisfies the system of equations above?",
//     choices: c("(-2, 0)", "(0, 2)", "(2, 4)", "(4, 6)"),
//     answer: "B",
//   },
//   {
//     text: "Which of the following expressions is equivalent to (1 / (z - y))(1/y - 1/z)?",
//     choices: c("1 / (yz)", "1 / (y^2 * z^2)", "-1 / (y - z)^2", "-1"),
//     answer: "A",
//   },
//   {
//     passage: "x + ay = 5\n2x + 6y = b",
//     text: "In the system of equations above, a and b are constants. If the system has one solution, which of the following could be the values of a and b?",
//     choices: c("a = 3, b = 10", "a = 3, b = 12", "a = 3, b = -4", "a = 10, b = 3"),
//     answer: "D",
//   },
//   {
//     // img: IMG + "m2-14.png",
//     text: "In the xy-plane above, line segment AB is the diagonal of a rectangle. If the area of the rectangle is 20, what is the slope of AB?",
//     choices: c("1.25", "1.5", "2.5", "5"),
//     answer: "A",
//   },
// {
// // img: IMG + "m2-15.png",
// text: "In the figure above, D is the midpoint of AB and E is the midpoint of BC. The area of trapezoid ADEC is how many times the area of triangle DBE?",
// choices: c("2", "2.5", "3", "3.5"),
// answer: "C",
// },
// {
// text: "If 3/x = 12, what is the value of 2/x?",
// choices: c("8", "10", "12", "16"),
// answer: "A",
// },
// {
// text: "In a class, there is one boy for every 2 girls. If 30 more girls join the class, there will be 7 girls for every boy. How many boys are in the class?",
// choices: c("4", "6", "8", "10"),
// answer: "B",
// },
// {
// passage: "3x - 2y = 6\n9x - 6y = 2a",
// text: "If the system of equations above has infinitely many solutions, what is the value of a?",
// choices: c("3", "6", "9", "12"),
// answer: "C",
// },
// {
// text: "There are 50 tennis balls, 20 of which are blue, in a container. After x blue tennis balls are removed, 25% of the tennis balls in the container are blue. What is the value of x?",
// choices: c("4", "6", "8", "10"),
// answer: "D",
// },
// {
// passage: "x - y + 2 = 0\n(x + 2)^2 - 7(x + 2) + 25 = 4y - 5",
// text: "If (x, y) is a solution to the system of equations above, what is one possible value of x?",
// choices: c("3", "6", "9", "12"),
// answer: "A",
// },
// {
// // img: IMG + "m2-21.png",
// text: "Functions f(x) = x^2 - 2x + 1 and g(x) = x^2 - 10x + 25 are graphed in the xy-plane above. If the graphs of f and g are tangent to the x-axis and intersect at the point (h, k), what is the value of h + k?",
// choices: c("3", "7", "13", "21"),
// answer: "B",
// },
// {
// // img: IMG + "m2-22.png",
// text: "In the xy-plane above, a line with a slope of 4 intersects a parabola at the origin and at the point (h, k). If the vertex of the parabola is at (2, -8), what is the value of k?",
// choices: c("6", "12", "18", "24"),
// answer: "D",
// },
// ];