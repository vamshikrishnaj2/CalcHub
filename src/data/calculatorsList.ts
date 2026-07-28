import { CalculatorInfo } from '../types';

export const CATEGORIES = [
  { id: 'financial', label: 'Financial', icon: 'DollarSign', desc: 'Manage your wealth, compute credit loans, standard taxes, and retirement yields.' },
  { id: 'health', label: 'Health & Fitness', icon: 'HeartPulse', desc: 'Keep track of your fitness indexes, BMI, daily fluid metrics, and custom BMR factors.' },
  { id: 'math', label: 'Math & Algebra', icon: 'Calculator', desc: 'Perform percentages, scientific formats, detailed ratios, fractions, and discounts.' },
  { id: 'datetime', label: 'Date & Time', icon: 'Clock', desc: 'Track precise ages, durations, date gaps, and live countdown tasks.' },
  { id: 'unit', label: 'Unit Converters', icon: 'Scale', desc: 'Translate metric bounds for length, raw temp ratings, speeds, area, weight, and volume.' }
] as const;

export const calculatorsList: CalculatorInfo[] = [
  // --- FINANCIAL CALCULATORS ---
  {
    id: 'emi',
    title: 'EMI Calculator',
    description: 'Calculate Equated Monthly Installments (EMI) for home, auto, or personal loans instantly.',
    category: 'financial',
    path: '/financial/emi',
    iconName: 'CreditCard',
    isPopular: true,
    metaTitle: 'EMI Calculator - Loan Equated Monthly Installment Planner',
    metaDescription: 'Estimate your monthly credit EMI outputs with full amortization structures, interest components, and repayment tables.',
    formula: {
      equation: 'EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ - 1)',
      description: 'P represents the principal loan amount, r is the monthly interest rate (annual interest rate divided by 12 ÷ 100), and n is the total number of monthly payments.',
      steps: [
        'Divide your annual interest rate by 12 to get the monthly interest rate r.',
        'Multiply the term in years by 12 to obtain the total monthly terms n.',
        'Apply the formula: multiply principal by rate factor then raise it across compound intervals.',
        'The answer highlights your fixed monthly pay-out comprising combined interest and principal.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is an EMI?', answer: 'An Equated Monthly Installment (EMI) represents a fixed payment amount made by a borrower to a lender at a specified date each calendar month.' },
      { id: 'q2', question: 'How can I reduce my EMI payment amount?', answer: 'You can reduce your EMI by choosing a longer loan tenure, negotiating a lower interest rate, or making a larger prepayment/downpayment.' }
    ]
  },
  {
    id: 'sip',
    title: 'SIP Calculator',
    description: 'Project returns on your Systematic Investment Plans (SIP) and estimate mutual fund yields.',
    category: 'financial',
    path: '/financial/sip',
    iconName: 'TrendingUp',
    isPopular: true,
    metaTitle: 'SIP Calculator - Systematic Wealth Investment Projector',
    metaDescription: 'Project the compounding yield of periodic systematic investments over multiple years based on expected return rates.',
    formula: {
      equation: 'M = P × [ ( (1 + i)ⁿ - 1 ) / i ] × (1 + i)',
      description: 'M is the maturity amount, P is the regular SIP investment, i is the periodic interest rate (monthly rate), and n represents the total index of periodic installments.',
      steps: [
        'Determine your periodic savings per month and expected annual growth.',
        'Establish monthly rate index by dividing the expected annual rate by 12, then divided by 100.',
        'Plug inputs into the geometric growth formula with compounded intervals.',
        'Assess the accumulated wealth versus total basic principal capital deposited.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is SIP?', answer: 'SIP stands for Systematic Investment Plan, a disciplined process of putting fixed amounts of money regularly into mutual funds or savings plans.' },
      { id: 'q2', question: 'Does compounding affect SIP investments?', answer: 'Yes! Periodic compounding grows both your initial deposit and accumulated returns over time, accelerating growth in later years.' }
    ]
  },
  {
    id: 'compound-interest',
    title: 'Compound Interest Calculator',
    description: 'Understand how compound interest grows your principal overtime with custom compounding frequencies.',
    category: 'financial',
    path: '/financial/compound-interest',
    iconName: 'Briefcase',
    isTrending: true,
    metaTitle: 'Compound Interest Calculator - Compounding Savings Planner',
    metaDescription: 'Simulate how reinvested earnings multiply over time with monthly, quarterly, or annual compound intervals.',
    formula: {
      equation: 'A = P × (1 + r/n)ⁿᵗ',
      description: 'A is final balance, P is initial principal, r is decimal interest rate, n is recurring compounds per year, and t is maturity duration in years.',
      steps: [
        'Convert nominal rate percentage into decimal form by dividing by 100.',
        'Divide interest rate r by compound frequency factor n.',
        'Add one to the quotient term, then raise this to the power of total compounding cycles (n × t).',
        'Multiply initial principal balance by this compounding exponential factor.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is compounding interest?', answer: 'Compounding is generating interest on your previously earned interest, added straight back to the core principal base.' },
      { id: 'q2', question: 'How does compound period rate change maturity yield?', answer: 'More frequent compound intervals (e.g., daily or monthly vs. annually) result in higher overall maturity values because interest is calculated on inflated principal sooner.' }
    ]
  },
  {
    id: 'mortgage',
    title: 'Mortgage Calculator',
    description: 'Determine monthly mortgage payments including local interest, property assessment, and terms.',
    category: 'financial',
    path: '/financial/mortgage',
    iconName: 'Home',
    isPopular: true,
    metaTitle: 'Mortgage Calculator - Home Repayment Estimator',
    metaDescription: 'Find your monthly real estate repayments with visual breakdown of tax splits, principal components, and schedules.',
    formula: {
      equation: 'M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ - 1 ]',
      description: 'M is monthly payment, P is principal home loan amount minus down payment, r is monthly rate, and n is total month tenure.',
      steps: [
        'Deduct your cash down payment sum from the original transaction price to find mortgage balance P.',
        'Determine monthly rate r, which equals yearly rate percent divided by 1200.',
        'Execute the factor exponent relative to loan payoff tenure.',
        'Include fixed monthly buffer reserves for property tax or insurance premiums.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What does a mortgage payment comprise?', answer: 'It is typically grouped into PITI: Principal, Interest, Taxes, and homeowners Insurance safeguards.' },
      { id: 'q2', question: 'What is a typical down payment percentage?', answer: 'Common targets hover around 10% to 20%, though many conventional loans support lower options with private mortgage insurance.' }
    ]
  },
  {
    id: 'loan',
    title: 'Loan Calculator',
    description: 'Generic amortization planner to review total interest costs of flat or reducing rate terms.',
    category: 'financial',
    path: '/financial/loan',
    iconName: 'Percent',
    metaTitle: 'Loan Repayment & Amortization Calculator',
    metaDescription: 'Evaluate any basic financial loan index quickly, detailing total lifetime interest and repayment charts.',
    formula: {
      equation: 'Interest = Principal × Rate × Time',
      description: 'Used for simple terms, whereas amortized rates resolve with monthly interest compounding models.',
      steps: [
        'Specify aggregate credit principal, interest percent value and year period.',
        'Perform basic factor distribution or compounding interest division matching term frequency.',
        'Review lifetime finance charges incurred throughout the amortization timeline.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is amortization schedule?', answer: 'A periodic table showing each payment breakdown pointing to principal reduction and current interest due.' }
    ]
  },
  {
    id: 'income-tax',
    title: 'Income Tax Calculator',
    description: 'Estimate your progressive personal income tax liabilities, deductions, and taxable bands.',
    category: 'financial',
    path: '/financial/income-tax',
    iconName: 'Coins',
    metaTitle: 'Income Tax Estimator - Annual Net Salary Planner',
    metaDescription: 'Determine your net take-home salary after progressive tax brackets, deductions, and federal standards are processed.',
    formula: {
      equation: 'Tax = Σ(Progressive Brackets × Bracket Rates)',
      description: 'Gross Income is adjusted by applicable exemptions and deductions, then the remainder is divided into progressive tiers.',
      steps: [
        'Input your gross annual earnings from salaries, investments, or services.',
        'Subtract tax-saving deductions and valid standard allowance claims to find net taxable index.',
        'Apply income levels across progressive marginal tax bracket rates sequentially.',
        'Aggregate individual tier taxes to arrive at total annual obligations.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How do progressive tax brackets work?', answer: 'You pay tax at an increasing rate depending on the tier. Only the portion of income that falls inside each respective bracket is taxed at that specific percentage rate.' }
    ]
  },
  {
    id: 'gst',
    title: 'GST Calculator',
    description: 'Calculate Goods and Services Tax (GST) amounts easily with inclusive or exclusive pricing settings.',
    category: 'financial',
    path: '/financial/gst',
    iconName: 'Receipt',
    isTrending: true,
    metaTitle: 'GST Calculator - Goods & Services Tax Computations',
    metaDescription: 'Find gross price inclusive of GST rate or extract the precise tax component directly from an inclusive base cost.',
    formula: {
      equation: 'GST = Net × Rate / 100  |  Net = Gross / (1 + Rate / 100)',
      description: 'Net is the base cost, Gross represents the cumulative invoice total with taxes, and Rate is the GST percentage.',
      steps: [
        'To Add GST: Multiply base price by tax rate, then add that amount to original base price.',
        'To Remove GST: Divide gross amount by (1 + rate / 100) to find net price, then deduct net from gross to isolate the tax percentage.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is GST?', answer: 'GST stands for Goods and Services Tax, a consumption tax levied on physical goods, digital deliveries, and services.' }
    ]
  },
  {
    id: 'currency',
    title: 'Currency Converter',
    description: 'Quick reference currency utility mapping relative cross-rates for travel and shopping purposes.',
    category: 'financial',
    path: '/financial/currency',
    iconName: 'Globe',
    metaTitle: 'Currency Conversion Lookup Tool',
    metaDescription: 'Execute swift reference calculations comparing major currency pairs (USD, EUR, GBP, JPY, INR, CAD) based on current ratios.',
    formula: {
      equation: 'Value_B = Value_A × Exchange_Rate',
      description: 'Multiply currency value in base notation A by current conversion factor relative to target currency B.',
      steps: [
        'Select core base currency and your target conversion currency.',
        'Input the amount to convert.',
        'Multiply the value by current relative exchange rate index.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How often do foreign exchange rates shift?', answer: 'Global currency exchanges fluctuate 24 hours a day on interbank markets depending on economic factors, interest indices, and central bank movements.' }
    ]
  },
  {
    id: 'retirement',
    title: 'Retirement Calculator',
    description: 'Determine if your current savings, returns, and inflation expectations yield a sustainable retirement nest-egg.',
    category: 'financial',
    path: '/financial/retirement',
    iconName: 'ShieldAlert',
    metaTitle: 'Retirement Wealth Planner & Savings Calculator',
    metaDescription: 'Analyze your retirement readiness by projecting inflation-adjusted compounding balances and future drawdowns.',
    formula: {
      equation: 'Future Value = FV_Investments - FV_Drawdowns',
      description: 'Estimates accumulated wealth adjust of yearly compounding deposits minus periodic retirement drawdowns adjusted for inflation.',
      steps: [
        'Specify starting age, target retirement age, monthly savings rate, and expected return.',
        'Set projected inflation rate and desired post-retirement monthly expenses.',
        'Simulate life-long compounding cycles and map estimated depletion thresholds.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is the 4% rule in retirement?', answer: 'A classic benchmark suggesting a retiree can safely withdraw 4% of their initial portfolio balance in the first year, and adjust subsequent withdraws for inflation, without running out of funds over 30 years.' }
    ]
  },

  // --- HEALTH CALCULATORS ---
  {
    id: 'bmi',
    title: 'BMI Calculator',
    description: 'Calculate Body Mass Index (BMI) to understand if your weight range is optimal for your height.',
    category: 'health',
    path: '/health/bmi',
    iconName: 'HeartPulse',
    isPopular: true,
    metaTitle: 'BMI Calculator - Body Mass Index Assessment',
    metaDescription: 'Determine your current weight rating instantly using metric or imperial standards, and check healthy ranges.',
    formula: {
      equation: 'BMI = weight (kg) / [height (m)]²',
      description: 'Calculated as your mass in kilograms divided by the square of your body height in meters.',
      steps: [
        'Determine your height in meters or inches.',
        'Divide weight in kilograms by height squared.',
        'For Imperial: weight (lbs) / height (inches)² × 703.',
        'Match findings against standard health ranges: Underweight (<18.5), Normal (18.5 - 24.9), Overweight (25 - 29.9), and Obese (>=30).'
      ]
    },
    faqs: [
      { id: 'q1', question: 'Is standard BMI valid for weight training athletes?', answer: 'Not always. BMI measures total mass and does not separate lean skeletal muscle from body fat deposits, which can misclassify muscular individuals as overweight.' },
      { id: 'q2', question: 'What is a healthy weight target range?', answer: 'An index between 18.5 and 24.9 is statistically considered normal for most average adult demographics.' }
    ]
  },
  {
    id: 'calorie',
    title: 'Calorie Calculator',
    description: 'Estimate your daily calorie intake requirements in order to sustain, lose, or gain body weight.',
    category: 'health',
    path: '/health/calorie',
    iconName: 'Flame',
    isTrending: true,
    metaTitle: 'Calorie Intake Calculator - Daily Energy Tracker',
    metaDescription: 'Use the Mifflin-St Jeor equation combined with activity multipliers to find your unique daily maintenance energy bounds.',
    formula: {
      equation: 'Maintenance Calories = BMR × Activity_Multiplier',
      description: 'Where basic BMR is matched against systematic multipliers ranging from sedentary (1.2) to highly active physical states (1.9).',
      steps: [
        'Submit age, body weight, gender, height, and active routine state.',
        'Compute base metabolic factors to isolate internal base requirements (BMR).',
        'Apply factor scaling matching regular exercise habits.',
        'Select calorie targets for deficit (-500 kcal) or surplus goals (+300 kcal).'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How big should my calorie deficit be to lose 1 lb per week?', answer: 'A daily deficit of 500 calories is equivalent to 3500 calories per week, which roughly equals one pound of body fat.' }
    ]
  },
  {
    id: 'water-intake',
    title: 'Water Intake Calculator',
    description: 'Identify your personal recommended daily water fluid intake based on weight and active levels.',
    category: 'health',
    path: '/health/water-intake',
    iconName: 'Droplet',
    metaTitle: 'Daily Water Intake Calculator - Hydration planner',
    metaDescription: 'Calculate standard target hydration quantities in liters or ounces, including extra allocations for active exercise periods.',
    formula: {
      equation: 'Water (Liters) = (Weight_kg × 0.035) + Active_Factor',
      description: 'Basic consumption baseline scales around body weight with additive metrics representing active physical perspiration.',
      steps: [
        'Establish body mass index weight in kg or pounds.',
        'Evaluate base coefficient factor (roughly 35ml of clean liquids per kilogram).',
        'Incorporate an additional 350ml - 500ml for every 30 minutes of high-intensity sweat exercise.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'Can tea or black coffee contribute to daily fluid totals?', answer: 'Yes, most caffeinated fluids can count toward hydration intake as the water inside them outweighs their mild diuretic effect.' }
    ]
  },
  {
    id: 'ideal-weight',
    title: 'Ideal Weight Calculator',
    description: 'Find your healthy baseline weight ranges based on classic Devine and Robinson medical equations.',
    category: 'health',
    path: '/health/ideal-weight',
    iconName: 'Scale',
    metaTitle: 'Ideal Body Weight (IBW) Calculator',
    metaDescription: 'Access classic medical standards evaluating ideal weight values relative to structural height and gender limits.',
    formula: {
      equation: 'Male: 50.0 + 2.3 kg per inch over 5 feet | Female: 45.5 + 2.3 kg per inch over 5 feet',
      description: 'The standard Devine medical index assumes a baseline target of five feet (60 inches) height.',
      steps: [
        'Select physical sex assignments and input heights.',
        'Deduct 5 feet (60 inches) from target heights to check remaining height difference.',
        'Perform coefficient multiplication on height increments, then add to the default gender baseline.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'Is Ideal Body Weight (IBW) a strict rule?', answer: 'No, it serves as a general medical reference. Individual parameters like muscle mass, frame width, and overall body composition are vital.' }
    ]
  },
  {
    id: 'pregnancy',
    title: 'Pregnancy Due Date Calculator',
    description: 'Track estimated delivery dates (EDD) based on last menstrual periods or conception dates.',
    category: 'health',
    path: '/health/pregnancy',
    iconName: 'Sparkles',
    metaTitle: 'Pregnancy Due Date & Gestation Tracker',
    metaDescription: 'Estimate your theoretical childbirth timeline and gestational weeks using standard menstrual calculations.',
    formula: {
      equation: 'EDD = LMP + 280 Days (Naegele Rule: LMP - 3 Months + 7 Days + 1 Year)',
      description: 'The Naegele calculation rule adds seven days and subtracts three months starting at last menstrual date.',
      steps: [
        'Input your last menstrual cycle start date.',
        'Add exactly 280 biological days (which represents 40 pregnancy weeks).',
        'Review current gestational age estimates and trimester thresholds.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What percentage of babies arrive exactly on their due date?', answer: 'Only about 4% to 5% of babies are born precisely on their computed biological due date.' }
    ]
  },
  {
    id: 'body-fat',
    title: 'Body Fat Calculator',
    description: 'Estimate your body fat percentage using standard US Navy anthropometric circumference measurements.',
    category: 'health',
    path: '/health/body-fat',
    iconName: 'FlameKindling',
    metaTitle: 'Body Fat Percentage Calculator - Lean Mass Planner',
    metaDescription: 'Utilize US Navy formulas incorporating neck, waist, height, and hip measurements to calculate your body fat tier.',
    formula: {
      equation: 'US Navy Body Fat Formulas',
      description: 'Leverages algorithms involving the logarithm of circumference deltas against overall height.',
      steps: [
        'Measure waist, neck, and hip circumferences accurately using tape.',
        'Enter height and gender parameters.',
        'Execute log calculations for US Navy health guidelines, noting overall body fat classification.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is a healthy body fat percentage for women?', answer: 'A common fitness range is 21% to 32%, contrasted to men where 14% to 24% is standard.' }
    ]
  },
  {
    id: 'bmr',
    title: 'BMR Calculator',
    description: 'Isolate Basal Metabolic Rate (BMR) representing energy expended at complete physical rest.',
    category: 'health',
    path: '/health/bmr',
    iconName: 'Activity',
    metaTitle: 'BMR Calculator - Basal Metabolic Rate Estimations',
    metaDescription: 'Assess total thermal calories consumed passively inside warm, non-active metabolic scenarios.',
    formula: {
      equation: 'Harris-Benedict or Mifflin-St Jeor Equation',
      description: 'Relies on biological age, gender scales, heights, and weights to model involuntary organ operation costs.',
      steps: [
        'Inputs: weight (kg), heights (cm), and biological age records.',
        'Execute model: Male BMR = 10W + 6.25H - 5A + 5  |  Female BMR = 10W + 6.25H - 5A - 161.',
        'Review results showing your absolute base metabolic rate.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What influences my BMR?', answer: 'Lean muscle tissue increases BMR, age causes BMR to slowly decrease, while active thyroid levels and weight status also play massive roles.' }
    ]
  },

  // --- MATH CALCULATORS ---
  {
    id: 'scientific',
    title: 'Scientific Calculator',
    description: 'Fully featured, responsive web calculator supporting trigonometric, root, and power operations.',
    category: 'math',
    path: '/math/scientific',
    iconName: 'Calculator',
    isPopular: true,
    metaTitle: 'Scientific Calculator - Free Online Math Solver',
    metaDescription: 'Solve trigonometric, exponent, and algorithmic expressions directly inside a responsive click-grid interface.',
    formula: {
      equation: 'Order of Operations: PEMDAS / BODMAS',
      description: 'Prioritizes Parenthasis/Brackets, Exponents, Multiplication & Division, ending on Addition & Subtraction.',
      steps: [
        'Enter equation inputs via direct keyboard strokes or interactive display pads.',
        'Execute transcendental trig functions, standard logarithms, or specific scientific exponent factors.',
        'Press equals to see output.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is scientific notation?', answer: 'A system of writing numbers that accommodates values too large or small to be conveniently written in standard decimal notation (e.g., 5.9 × 10⁸).' }
    ]
  },
  {
    id: 'percentage',
    title: 'Percentage Calculator',
    description: 'Solve classic percentages, value increases, ratios, or fractional portions easily.',
    category: 'math',
    path: '/math/percentage',
    iconName: 'Percent',
    isTrending: true,
    metaTitle: 'Percentage Calculator - Value Increase & Base Solver',
    metaDescription: 'Verify increase margins, fractional quotients, or base proportion relationships instantly.',
    formula: {
      equation: 'Percentage = (Part / Whole) × 100',
      description: 'Calculates the proportion of one part against a whole, multiplied by 100.',
      steps: [
        'To find Y% of X: Multiply X by Y, then divide the result by 100.',
        'To find what percent X is of Y: Divide X by Y, then multiply the final quotient by 100.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What does percentage mean?', answer: 'Percentage literally translates as "per hundred", representing values out of 100 units.' }
    ]
  },
  {
    id: 'fraction',
    title: 'Fraction Calculator',
    description: 'Perform arithmetic operations like adding, subtracting, multiplying, or reducing fractions.',
    category: 'math',
    path: '/math/fraction',
    iconName: 'Binary',
    metaTitle: 'Fraction Calculator - Common Denominator Solver',
    metaDescription: 'Review operations between complex fraction formats, with simplified outputs and mixed decimal translations.',
    formula: {
      equation: 'a/b ± c/d = (ad ± bc) / bd',
      description: 'When denominators do not match, compile their Least Common Multiple (LCM) to run operations.',
      steps: [
        'Input fraction elements with specific numerator and denominator boundaries.',
        'Discover Least Common Multiple (LCM) values to set identical cross denominators.',
        'Perform selected operation (Multiply, Sum, Devide), then reduce terms to the simplest form.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is a mixed fraction?', answer: 'A mixed fraction is an integer combined with a proper fraction (e.g., 2 ½).' }
    ]
  },
  {
    id: 'ratio',
    title: 'Ratio Calculator',
    description: 'Simplify custom proportions, determine scale parameters, or solve for missing values.',
    category: 'math',
    path: '/math/ratio',
    iconName: 'Divide',
    metaTitle: 'Ratio Calculator - Simplify and Scale Proportions',
    metaDescription: 'Resolve relative values or scale fractions according to strict proportionate multiplier ratios.',
    formula: {
      equation: 'A : B = C : D',
      description: 'Requires the ratio of components to remain equal under scale transformation rules.',
      steps: [
        'Provide initial comparison terms A and B.',
        'Perform greatest common divisor parsing to scale values down.',
        'Determine scaling outputs or resolve missing parameters across proportional matrices.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is a ratio?', answer: 'A mathematical relationship expressing relative size, showing how many times one number contains another.' }
    ]
  },
  {
    id: 'average',
    title: 'Average Calculator',
    description: 'Calculate average metrics, including mean, median, mode, ranges, and geometric means.',
    category: 'math',
    path: '/math/average',
    iconName: 'Sigma',
    metaTitle: 'Average, Mean, Mode, and Median Calculator',
    metaDescription: 'Extract essential statistical measures from multi-item numeric datasets instantly.',
    formula: {
      equation: 'Mean = Σ(X_i) / N',
      description: 'Calculates the sum of all elements divided by total item count.',
      steps: [
        'Input integers or decimal terms separated by commas.',
        'Sum all elements inside index to solve for Arithmetic Mean.',
        'Sort elements in rising sequence order to find Median, or calculate Mode frequency rates.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'Difference between Mean and Median?', answer: 'Mean is the numerical average of all values, whereas Median represents the absolute middle number in a sorted array.' }
    ]
  },
  {
    id: 'profit-loss',
    title: 'Profit & Loss Calculator',
    description: 'Determine commercial margins, markup percentages, cost totals, and profit gains.',
    category: 'math',
    path: '/math/profit-loss',
    iconName: 'Maximize',
    metaTitle: 'Profit and Loss Margin Calculator',
    metaDescription: 'Quickly analyze margins and markups on commercial physical sales or digital delivery systems.',
    formula: {
      equation: 'Profit % = [ (Selling Price - Cost) / Cost ] × 100',
      description: 'Helps track profit percentage markup over original acquisition costs.',
      steps: [
        'Input aggregate acquisition base costs alongside sell prices.',
        'Isolate absolute revenue markup to find net profit margins.',
        'Determine markup and margin percentages relative to the sales amount.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What is profit margin?', answer: 'The percentage of sales price representing pure net income, calculated as profit divided by selling price.' }
    ]
  },
  {
    id: 'discount',
    title: 'Discount Calculator',
    description: 'Establish bargain rates, gross net offsets, and total cash savings on promotional sales items.',
    category: 'math',
    path: '/math/discount',
    iconName: 'Tag',
    metaTitle: 'Promo Sales Discount Calculator',
    metaDescription: 'Determine total net pricing after initial percent price discounts and additional sales tax buffers are computed.',
    formula: {
      equation: 'Final Price = Original Price × (1 - Discount / 100)',
      description: 'Deducts the specified discount percentage from the original purchase value.',
      steps: [
        'Enter original tag prices of consumer retail merchandise.',
        'Apply promotional discounts percent or flat coupon dollar reductions.',
        'Isolate net cost yields including additional checkout tax rates.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How is a percentage discount calculated?', answer: 'Multiply the original price by the discount percent, divide by 100, and subtract that amount from the original price.' }
    ]
  },

  // --- DATE & TIME CALCULATORS ---
  {
    id: 'age',
    title: 'Age Calculator',
    description: 'Calculate your exact age, detailing years, months, weeks, days, and seconds from birth.',
    category: 'datetime',
    path: '/datetime/age',
    iconName: 'User',
    isPopular: true,
    metaTitle: 'Age Calculator - Precise Chronological Calculation',
    metaDescription: 'Discover your exact biological age in years, months, weeks, layouts, and seconds from birth.',
    formula: {
      equation: 'Age = Date_Now - Date_of_Birth',
      description: 'Performs precise Gregorian calendar alignment to compute absolute elapsed calendar intervals.',
      steps: [
        'Select date of birth (DOB) and base comparison date.',
        'Subtract years, months, and days dynamically, adjusting for leap years.',
        'Review total lifespan metrics represented in months, days, hours, and seconds.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'Does leap year count alter the day totals?', answer: 'Yes! The calculator accounts for leap years containing 366 days instead of 365 days.' }
    ]
  },
  {
    id: 'date-difference',
    title: 'Date Difference Calculator',
    description: 'Compare two dates to find the exact duration in days, weeks, or calendar increments.',
    category: 'datetime',
    path: '/datetime/date-difference',
    iconName: 'CalendarDays',
    isTrending: true,
    metaTitle: 'Date Range & Duration Difference Calculator',
    metaDescription: 'Calculate the total number of days, weeks, or months between two specific calendar boundaries.',
    formula: {
      equation: 'Days = Date_B - Date_A',
      description: 'Calculates the total absolute milliseconds difference between two timestamps, then converts that value into days.',
      steps: [
        'Select starting date A and target ending date B.',
        'Decide if you want to include or omit the ending day in the total count.',
        'Evaluate the result in weeks, months, or total days.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How many days fall between Jan 1st and Dec 31st recursively?', answer: 'There are exactly 363 days between them (excluding both dates) or 365 days including them.' }
    ]
  },
  {
    id: 'countdown',
    title: 'Countdown Timer',
    description: 'Create responsive visual countdown clocks leading toward upcoming goals or deadlines.',
    category: 'datetime',
    path: '/datetime/countdown',
    iconName: 'Hourglass',
    metaTitle: 'Live Countdown Clock & Target Timer',
    metaDescription: 'Generate dynamic visual timers that count down in real-time toward your major target dates.',
    formula: {
      equation: 'Time Remaining = Target_Timestamp - Current_Timestamp',
      description: 'Updates automatically every second until reaching zero.',
      steps: [
        'Provide a target deadline date and hour.',
        'The timer calculates relative distance and displays remaining intervals.',
        'Observe live seconds countdown in real-time.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'What happens when a countdown reaches zero?', answer: 'The countdown highlights that the date has arrived and alerts you with a visual marker.' }
    ]
  },
  {
    id: 'time-duration',
    title: 'Time Duration Calculator',
    description: 'Sum up multiple hourly intervals or calculate clock-time differences.',
    category: 'datetime',
    path: '/datetime/time-duration',
    iconName: 'Timer',
    metaTitle: 'Time Duration & Work Hour Clock Calculator',
    metaDescription: 'Subtract morning/evening punch-in clocks or aggregate task schedules in total hours and minutes.',
    formula: {
      equation: 'Duration = End_Time - Start_Time',
      description: 'Operates on a 24-hour cycle to prevent negative calculations.',
      steps: [
        'Select starting clock hour (AM/PM) and target complete times.',
        'Adjust for crossing past midnight (24-hour transition thresholds).',
        'Add up multiple daily work sessions to compute cumulative totals.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How are fractional hours translated into minutes?', answer: 'Multiply decimal values by 60 (e.g., 8.25 hours equals exactly 8 hours and 15 minutes).' }
    ]
  },

  // --- UNIT CONVERTERS ---
  {
    id: 'length',
    title: 'Length Converter',
    description: 'Convert values between metric and imperial systems like meters, feet, miles, and yards.',
    category: 'unit',
    path: '/unit/length',
    iconName: 'Ruler',
    isPopular: true,
    metaTitle: 'Length and Distance Converter - Units Tracker',
    metaDescription: 'Convert between millimeters, centimeters, meters, kilometers, inches, feet, yards, and miles.',
    formula: {
      equation: 'Value_Target = Value_Source × Factor_Multiplier',
      description: 'Multiply your source value by the standard relative scaling coefficient to find the equivalent target value.',
      steps: [
        'Select starting length units (e.g., Meters) and final output units (e.g., Feet).',
        'Input quantity values.',
        'The converter applies the constant factor to output the equivalent length.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How many centimeters are in an inch?', answer: 'There are exactly 2.54 centimeters in an inch, which serves as the international standard.' }
    ]
  },
  {
    id: 'weight',
    title: 'Weight Converter',
    description: 'Translate weight ratios (kilograms, pounds, ounces, grams, tons) accurately.',
    category: 'unit',
    path: '/unit/weight',
    iconName: 'Weight',
    isTrending: true,
    metaTitle: 'Weight and Mass Converter - Metric/Imperial',
    metaDescription: 'Quickly convert between grams, kilograms, tonnes, ounces, pounds, and stones with exact precision.',
    formula: {
      equation: 'Value_Target = Value_Source × Factor_Multiplier',
      description: 'Transforms metrics according to strict international physical scale weights.',
      steps: [
        'Select your source mass unit (e.g., Kilogram) and target unit (e.g., Pounds).',
        'Enter weight value.',
        'The tool outputs conversion limits instantly with precision decimal control.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How standard is the Kilogram/Pound ratio?', answer: 'One Kilogram corresponds to approximately 2.20462 pounds.' }
    ]
  },
  {
    id: 'temperature',
    title: 'Temperature Converter',
    description: 'Convert temperature values between Celsius, Fahrenheit, and Kelvin scales.',
    category: 'unit',
    path: '/unit/temperature',
    iconName: 'Thermometer',
    metaTitle: 'Temperature Converter - Celsius, Fahrenheit, Kelvin',
    metaDescription: 'Perform thermodynamic conversions between Celsius, Fahrenheit, and Kelvin temperature scales.',
    formula: {
      equation: '°F = (°C × 9/5) + 32  |  °C = (°F - 32) × 5/9  |  K = °C + 273.15',
      description: 'Converts thermal readings relative to freezing/boiling bounds and absolute zero.',
      steps: [
        'Determine source thermal unit and input the reading.',
        'Apply the algebraic ratio formula (e.g., scale Fahrenheit to Celsius).',
        'Analyze temperature outputs in decimal metrics.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'At what value do Celsius and Fahrenheit cross?', answer: 'They intersect at exactly -40 degrees (meaning -40°C is equal to -40°F).' }
    ]
  },
  {
    id: 'speed',
    title: 'Speed Converter',
    description: 'Quickly convert between Kilometers per Hour (km/h), Miles per Hour (mph), Knots, and Meters per Second (m/s).',
    category: 'unit',
    path: '/unit/speed',
    iconName: 'Zap',
    metaTitle: 'Speed & Velocity Units Converter',
    metaDescription: 'Compare various speed classifications like KPH, MPH, Knots, and Mach speeds.',
    formula: {
      equation: 'Speed_B = Speed_A × Standard_Factor',
      description: 'Applies standard physical speed scaling constants.',
      steps: [
        'Select the original speed scale unit (e.g., MPH).',
        'Input scale quantities.',
        'Review outputs inside target systems (e.g., convert to KM/H or Knots).'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How fast is 1 Knot in standard terms?', answer: 'One Knot is equal to exactly 1 nautical mile per hour, or approximately 1.15078 standard miles per hour.' }
    ]
  },
  {
    id: 'area',
    title: 'Area Converter',
    description: 'Convert surface dimensions like square meters, square feet, acres, and hectares.',
    category: 'unit',
    path: '/unit/area',
    iconName: 'Grid',
    metaTitle: 'Area & Surface Dimension Converter',
    metaDescription: 'Manage flat land sizes, conversion units, hectares, and plot boundaries with ease.',
    formula: {
      equation: 'Area_B = Area_A × Conversion_Factor',
      description: 'Scales surface measures exponentially.',
      steps: [
        'Input measurement numbers in base values.',
        'Choose output units (e.g., scale Square Meters to Hectares or Acres).',
        'Compare relative dimensions.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How many square feet are in one acre?', answer: 'An acre contains exactly 43,560 square feet of level area.' }
    ]
  },
  {
    id: 'volume',
    title: 'Volume Converter',
    description: 'Convert liquid and dry volumes between liters, milliliters, gallons, cups, and cubic units.',
    category: 'unit',
    path: '/unit/volume',
    iconName: 'Container',
    metaTitle: 'Volume & Fluid Capacity Converter',
    metaDescription: 'Manage dry capacity and liquid units including fluid ounces, liters, pints, and cubic meters.',
    formula: {
      equation: 'Volume_B = Volume_A × Factor',
      description: 'Relates global fluid measurements to standard metric volumes.',
      steps: [
        'Input quantities in volumetric base metrics.',
        'Select output containers (e.g., Liter, Milliliter, gallon).',
        'Execute scaling factors.'
      ]
    },
    faqs: [
      { id: 'q1', question: 'How many milliliters are in a US liquid gallon?', answer: 'A US liquid gallon is equal to approximately 3785.41 milliliters.' }
    ]
  }
];
