const overlayHTML = '<div class="overlaye"><h1>מחשבונים והמלצות</h1></div>';
header.innerHTML += overlayHTML;

//WEIGHT STAGES
const UNDERWEIGHT = "תת משקל";
const NORMALWEIGHT = "משקל תקין";
const OVERWEIGHT = "עודף משקל קל";
const OBESE = "השמנת יתר";
//ACTIVITIES
const NOTACTIVE = "לא פעיל";
const LIGHTACTIVE = "מעט פעיל";
const ACTIVE = "פעיל";
const VERYACTIVE = "פעיל מאוד";
const activityInput = document.getElementById("activity");
//finding logged user
const userJson = localStorage.getItem("currentUser");
if (!userJson) {
  window.location.replace("/views/login.html?from=calculator");
}
const user = JSON.parse(userJson);
const customer = new Customer(user);

const calculatorButton = document.getElementById("calculatorButton");

//CLICKING ON CALCULATE BUTTON EVENT
calculatorButton.onclick = function (e) {
  e.preventDefault();
  const bmiInput = document.getElementById("BMI");
  const bmrInput = document.getElementById("BMR");
  const bodyFatInput = document.getElementById("bodyFat");
  bodyFatInput.value =
    getBodyFat(
      customer.measurements.at(-1),
      customer.getAge(),
      customer.gender
    ).toFixed(2) + "%";
  bmrInput.value = customer.getCurrentBMR().toFixed(2);
  const BMI = getBMI(customer.measurements.at(-1)).toFixed(2);
  bmiInput.value = BMI;
  updateBmiSlider(BMI);

  const recommendation = document.getElementById("recomendation");
  const menuTable = recommendation.querySelector("table tbody");
  const stage = getStage(bmiInput);
  menuTable.innerHTML += menus[stage];
  recommendation.style.display = "unset";
  document.getElementById("MainResult").innerText = getMainMessage(
    bmiInput,
    bmrInput,
    bodyFatInput,
    (weighting = customer.measurements.at(-1))
  );
  document.getElementById("resultExplained").innerText =
    getRecomendationByStage(getStage(bmiInput), bmrInput);
};
//END EVENT

//GET MAIN MESSAGE BASED ON RESULTS
function getMainMessage(bmiInput, bmrInput, bodyFatInput, weighting) {
  stage = getStage(bmiInput);
  return `התוצאות שלך חושבו עבור משקל של ${weighting.weight} קילו וגובה של ${
    weighting.height / 100
  } מטר והתקבל שאתה ב${stage}.\n מאחר והגדרת את עצמך כאדם ${
    activityInput.options[activityInput.selectedIndex].text
  } עליך להוסיף ${addActivityCalories(
    activityInput.value.toString()
  )} קלוריות לBMR ההתחלתי שלך, כלומר לצרוך ${
    parseFloat(bmrInput.value) +
    addActivityCalories(activityInput.value.toString())
  } קלוריות ביום כדי להשאר במשקל הנוכחי שלך.`;
}
//END

//GET STAGE BASED ON BMI RESULTS
function getStage(bmiInput) {
  if (bmiInput.value < 18.5) {
    return UNDERWEIGHT;
  }
  if (bmiInput.value >= 18.5 && bmiInput.value < 25) {
    return NORMALWEIGHT;
  }
  if (bmiInput.value >= 25 && bmiInput.value < 30) {
    return OVERWEIGHT;
  } else {
    return OBESE;
  }
}
//END

//GET PERSONAL RECOMENDATIONS BASED ON CALCULATED STAGE.
function getRecomendationByStage(stage, bmr) {
  if (stage === UNDERWEIGHT) {
    return `יש לאתר את הגורם לאיבוד המשקל המתמשך שהביא למצב של תת משקל: האם מדובר במחלה? בבעיות עיכול? בדיכאון שגורם לחוסר תיאבון?\n ישנם גורמים רבים שעלולים להוביל לתת משקל ואבחון על ידי רופא יעזור באיתור הגורם ובטיפול המתאים ביותר. בכדי להחזיר את הגוף למצב של משקל תקין, יש להגדיל את כמות צריכת הקלוריות היומית, במקרה שלך היא ${bmr.value} קלוריות ליום רק עבור תפקודים חיוניים של הגוף שלך! ולכן נמליץ שהצריכה תהיה גבוהה יותר מכמות שריפת הקלוריות היומית.\n במקביל, ניתן להעלות את מסת השריר, שתורמת גם היא להעלאת מסת הגוף ונלחמת בתת משקל.`;
  }
  if (stage === NORMALWEIGHT) {
    return `שמירה על משקל התקין שלכם חשובה לבריאות, התעמלות קבועה ממלאת תפקיד חשוב בשמירה על המשקל. היא עשויה לסייע לכם לשרוף קלוריות נוספות ולהאיץ את קצב חילוף החומרים שלכם, שני גורמים הדרושים על מנת להגיע למאזן אנרגטי שכן כרגע אתם שורפים ${bmr.value} קלוריות רק עבור התפקודים החיוניים של הגוף שלכם.\n 
      בנוסף שימו לב שהתזונה שלכם מכילה חלבונים, החלבונים מעלים את רמתם של הורמונים מסוימים בגוף, הגורמים לשובע וחשובים לשם השמירה על המשקל התקין. 
      בנוסף, מסת שריר מופחתת עשויה להגביל את יכולתכם לשמור על המשקל התקין שלכם ולכן בצעו אימוני כוח.`;
  }
  if (stage === OBESE || stage === OVERWEIGHT) {
    return `השמנה נגרמת בדרך כלל על ידי אכילה מרובה ופעילות גופנית מועטה מדי.\n אם אדם צורך כמויות גבוהות של אנרגיה, במיוחד שומן וסוכרים, ואינו שורף את האנרגיה באמצעות פעילות גופנית, חלק ניכר מהאנרגיה העודפת תיאגר על ידי הגוף כשומן.\n\nאנשים אשר סובלים מהשמנת יתר/עודף משקל לרוב מתקשים לרדת במשקל באמצעות שינוי תזונתי בלבד.\n פעילות גופנית בשילוב עם דיאטה הינה הפתרון האולטימטיבי לירידה במשקל ושמירה לאורך זמן! חשוב לזכור שתהליך הירידה במשקל צריך להיות הדרגתי ואיטי על מנת להיות מסוגלים להתמיד בתהליך ולשמר את התוצאות.ההמלצות הרפואיות למבוגרים לגבי פעילות גופנית הן לבצע פעילות אירובית בעצימות בינונית לפחות 150 דקות, מדי שבוע. פעילות כזה כוללת לדוגמא כגון רכיבה על אופניים או הליכה מהירה.\n אין צורך לבצע את ה-150 דקות בפעם אחת אלא אפשר לדוגמא להתאמן במשך 30 דקות ביום במשך 5 ימים בשבוע.\n\n`;
  }
}

//ADDS EXTRA CALORIES TO ACTIVE PEOPLE BASED ON THEIR ACTIVITY LEVEL
function addActivityCalories(BMR) {
  if (activityInput.value === "not active") {
    return 0;
  }
  if (activityInput.value === "lightly active") {
    return 200;
  }
  if (activityInput.value === "active") {
    return 400;
  }
  if (activityInput.value === "very active") {
    return 500;
  }
}
//END

//BMI BAR SCRIPT
function updateBmiSlider(BMI) {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("currentValue");
  output.innerHTML = BMI;
  if (output.innerHTML > 25 || output.innerHTML < 18.5) {
    output.style.color = "red";
  } else if (output.innerHTML <= 25 || output.innerHTML >= 18.5) {
    output.style.color = "green";
  }
  slider.value = BMI;
}

//END

const menus = {
  [UNDERWEIGHT]: `<tr>
  <td>בוקר</td>
  <td>2 חביתה מ3 ביצים  /גביע קוטג' 5%</td>
  <td>2 3 פרוסות לחם מלא/ 150 גרם קוואקר</td>
  <td>10 שקדים/כף חמאת בוטנים</td>
  <td>2 פירות לבחירתך</td>
</tr>
<tr>
  <td>ביניים</td>
  <td>יוגורט 3%</td>
  <td>פרוסת לחם קל</td>
  <td>6 שקדים/קשיו/אגוזי מלך</td>
  <td>פרי לבחירתך</td>
</tr>
<tr>
  <td>צהריים</td>
  <td>120 גרם עוף בתנור/דג בתנור</td>
  <td>250 גרם אורז/פסטה/פתיתים</td>
  <td>כף טחינה/כף חומוס</td>
  <td>עד 3 ירקות לבחירתך</td>
</tr>
<tr>
  <td>ערב</td>
  <td>טונה בשמן/טונה במים/100 גרם עוף</td>
  <td>3 פרוסות לחם קל/150 גרם אורז/5 קרקרים</td>
  <td>2 כפות שמן זית/2 כפות טחינה</td>
  <td>עד 4 ירקות לבחירתך</td>
</tr>`,
  [NORMALWEIGHT]: `<tr>
  <td>בוקר</td>
  <td>2 ביצים קשות / חביתה מ2 ביצים</td>
  <td>2 פרוסות לחם קל/ 50 גרם קוואקר</td>
  <td>5 אגוזי מלך</td>
  <td>פרי/ירק לבחירתך</td>
</tr>
<tr>
  <td>ביניים</td>
  <td>מעדכן חלבון לבחירתך</td>
  <td>X</td>
  <td>4 שקדים/קשיו/אגוזי מלך</td>
  <td>פרי לבחירתך</td>
</tr>
<tr>
  <td>צהריים</td>
  <td>120 גרם עוף בתנור/דג בתנור</td>
  <td>150 גרם אורז מבושל/פסטה/פתיתים</td>
  <td>כף טחינה/כף חומוס</td>
  <td>עד 2 ירקות לבחירתך</td>
</tr>
<tr>
  <td>ערב</td>
  <td>טונה בשמן/טונה במים/סרדינים</td>
  <td>3 פרוסות לחם קל/8 פריכיות אורז/6 קרקרים</td>
  <td>2 כפות שמן זית/כף טחינה</td>
  <td>עד 4 ירקות לבחירתך</td>
</tr>`,
  [OBESE]: `<tr>
  <td>בוקר</td>
  <td>2 ביצים קשות / גבינה לבנה 3%</td>
  <td>2 פרוסות לחם קל/ 30 גרם קוואקר</td>
  <td>5 שקדים</td>
  <td>פרי/ירק לבחירתך</td>
</tr>
<tr>
  <td>צהריים</td>
  <td>120 גרם עוף בתנור/דג בתנור</td>
  <td>100 גרם אורז מבושל/קינואה מבושלת/בורגול</td>
  <td>כף טחינה/כף חומוס</td>
  <td>עד 2 ירקות לבחירתך</td>
</tr>
<tr>
  <td>ערב</td>
  <td>טונה בשמן/טונה במים/קוטג' 5%</td>
  <td>2 פרוסות לחם קל/6 פריכיות אורז/5 קרקרים</td>
  <td>כף שמן זית/כף טחינה</td>
  <td>עד 4 ירקות לבחירתך</td>
</tr>`,
  [OVERWEIGHT]: `
<tr>
  <td>בוקר</td>
  <td>2 ביצים קשות / גבינה לבנה 3%</td>
  <td>2 פרוסות לחם קל/ 30 גרם קוואקר</td>
  <td>5 שקדים</td>
  <td>פרי/ירק לבחירתך</td>
</tr>
<tr>
  <td>ביניים</td>
  <td>יוגורט 3%</td>
  <td>X</td>
  <td>4 שקדים/קשיו/אגוזי מלך</td>
  <td>פרי לבחירתך</td>
</tr>
<tr>
  <td>צהריים</td>
  <td>120 גרם עוף בתנור/דג בתנור</td>
  <td>100 גרם אורז מבושל/קינואה מבושלת/בורגול</td>
  <td>כף טחינה/כף חומוס</td>
  <td>עד 2 ירקות לבחירתך</td>
</tr>
<tr>
  <td>ערב</td>
  <td>טונה בשמן/טונה במים/קוטג' 5%</td>
  <td>2 פרוסות לחם קל/6 פריכיות אורז/5 קרקרים</td>
  <td>כף שמן זית/כף טחינה</td>
  <td>עד 4 ירקות לבחירתך</td>
</tr>`,
};
