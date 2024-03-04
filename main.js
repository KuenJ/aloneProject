const API_KEY =
  "F529NB%2F5qiEiFyoHyWfLolUIP5m9fiVmOcC01KzK6c1tZ9zVmbHOi0Ezr4mpgYFKdDxtip6c%2FzCvRBMfSynBqw%3D%3D";
let InfoList = [];

const buttonSpace = document.querySelectorAll(".button-space button"); // button-space영역아래 button 들을 모두들고옴

console.log("mmm", buttonSpace);

buttonSpace.forEach(
  (
    buttonSpace //map과비슷하지만 return값이없이 요소를 도는느낌이랄까. 그래서 전체 버튼영역아래있는 버튼들에게 클릭이벤트리스너를준다 .
  ) =>
    buttonSpace.addEventListener("click", (event) =>
      getContinentNameInformation(event)
    )
);

const getApi = async () => {
  const url = new URL(
    `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?ServiceKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();

  InfoList = data.data;
  render();
  console.log("dddd", InfoList);
};

const getContinentNameInformation = async (event) => {
  // 버튼에 해당하는 카테고리에  따라서 가져오는 코드
  const category = event.target.textContent;
  console.log(category);
  const url = new URL(
    `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?cond[continent_eng_nm::EQ]=${category}&ServiceKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("Ddd", data);
  InfoList = data.data; //  업데이트 한내용을 infoList 배열에 다시넣고 그려줘야 새롭게  클릭시 해당하는 값들이나온다.
  render();
};

const getCountryBySearch = async () => {
  const search = document.getElementById("search-input").value;
  console.log("search", search);

  const url = new URL(
    `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?cond[country_nm::EQ]=${search}&ServiceKey=${API_KEY}`
  );
  const response = await fetch(url);
  const data = await response.json();
  console.log("sarcomata", data);
  InfoList = data.data;
  render();
};
const render = () => {
  const newInfo = InfoList.map((info) => {
    return `<div class="row informal">
        <div class="col-lg-8">
          <img class="flag-img-size" src=${info.flag_download_url} " />
          <img class="map-img-size" src=${info.map_download_url} " />
        </div>
        <div class="col-lg-4">
          <ul class="list-unstyled">
            <li>영문 국가명: ${info.country_eng_nm}</li>
            <li>한글 국가명: ${info.country_nm}</li>
            <li>한글 대륙명: ${info.continent_nm}</li>
            <li>영문 대륙명: ${info.continent_eng_nm}</li>
            <li>경보 단계: ${info.alarm_lvl}</li>
            <li>작성일:${info.written_dt}</li>
            <li>위험지역:${info.remark}</li>
          </ul>
        </div>
      </div>`;
  }).join("");

  document.getElementById("information-board").innerHTML = newInfo;
};

getApi();

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스가져오기 .
//3. 그뉴스를 보여주기
