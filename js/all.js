const height = document.querySelector('.height');
const weight = document.querySelector('.weight');
const submit = document.querySelector('.submit');
const reset = document.querySelector('.reset');
const alertDOM = document.querySelector('.alert');
const totalDOM = document.querySelector('.total');
const recordDOM = document.querySelector('.record_items');

let BMIRecord = [];
const BMIData = {
  overLight: {
    class: 'overLigh',
    statusText: '體重過輕',
  },
  normal: {
    class: 'normal',
    statusText: '正常',
  },
  overweight: {
    class: 'overweight',
    statusText: '過重',
  },
  lOverweight: {
    class: 'lOverweight',
    statusText: '輕度肥胖',
  },
  mOverweight: {
    class: 'mOverweight',
    statusText: '中度肥胖',
  },
  hOverweight: {
    class: 'hOverweight',
    statusText: '重度肥胖',
  },
};

function calculationBMI() {
  let thisHeight = Number(height.value);
  let thisWeight = Number(weight.value);

  if (!isNaN(thisHeight) && !isNaN(thisWeight)) {
    let now = new Date();
    let nowDate = now.toLocaleString();
    let bmi = (thisWeight / Math.pow(thisHeight / 100, 2)).toFixed(1);
    let bmiStatus =
      bmi >= 35
        ? 'hOverweight'
        : bmi >= 30
        ? 'mOverweight'
        : bmi >= 27
        ? 'lOverweight'
        : bmi >= 24
        ? 'overweight'
        : bmi >= 18.5
        ? 'normal'
        : 'overLight';

    let userRecord = {
      height: thisHeight,
      weight: thisWeight,
      BMI: bmi,
      status: bmiStatus,
      timeStamp: nowDate,
    };
    
    BMIRecord.push(userRecord);
    
    render();

    height.value = '';
    weight.value = '';

  } else {
    alertDOM.textContent = '請輸入正確身高體重格式喔!!';
  };
};

function resetAll() {
  BMIRecord = [];
  height.value = '';
  weight.value = '';
  render();
}

function render() {
  alertDOM.textContent = '';
  
  let str = '';
  let bmiTotal = 0;
  let avg = 0; 
  BMIRecord.forEach( function(item){
    str =
      `<li class="record_item ${item.status}">
          <div class="time">
            <p>${item.timeStamp}</p>
          </div>
          <div class="result">
             <h3>${BMIData[item.status].statusText}</h3>
             <div class="text">
               <p>BMI: ${item.BMI}</p>
               <p>身高: ${item.height}</p>
               <p>體重: ${item.weight}</p>
             </div>
          </div>
        </li>` + str;

    bmiTotal = bmiTotal + parseInt(item.BMI);
  });

  if(bmiTotal !== 0){
    avg = (bmiTotal / BMIRecord.length).toFixed(1);
  }
  
  totalDOM.innerHTML = `總共有 ${BMIRecord.length} 筆紀錄，平均BMI為 ${avg}`;
  recordDOM.innerHTML = str;
}

submit.addEventListener('click', calculationBMI);
reset.addEventListener('click', resetAll);