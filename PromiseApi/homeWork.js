// sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

sleep(300).then(() => {
  console.log('Салам алейкум');
})