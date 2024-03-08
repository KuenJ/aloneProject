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

let totalCount = 0;
let pageNo = 1;
const numOfRows = 10;
const groupSize = 3;

let url = new URL(
  `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?ServiceKey=${API_KEY}` // 원래는 getApi함수에서 사용되었으나  다 공통으로 쓰이기때문에 전역변수로 선언후 url 변수만가져다쓰면됨아래는
);

const getApiInformation = async () => {
  //위 코드는 아래에서 계속반복되는 url  가져와서 json 변환해서 데이터 담아서  화면에 그려주는 역할을 하나의 함수정의해서 함수만선언해서 간편하게 사용가능

  try {
    url.searchParams.set("pageNo", pageNo);
    url.searchParams.set("numOfRows", numOfRows);
    const response = await fetch(url);
    console.log(response);

    const data = await response.json();
    console.log("ddd", data);

    if (response.status === 200) {
      if (data.data.length === 0) {
        throw new Error("검색에해당하는결과값이없습니다."); // 검색에 해당하는값이없다면 에러처리를 화면에보여주는 코드
      }

      InfoList = data.data; //  업데이트 한내용을 infoList 배열에 다시넣고 그려줘야 새롭게  클릭시 해당하는 값들이나온다.

      totalCount = data.totalCount;

      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log("error", error.message);
    errorRender(error.message);
  }
};

const getApi = async () => {
  url = new URL(
    `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?ServiceKey=${API_KEY}`
  );
  getApiInformation();
};

const getContinentNameInformation = async (event) => {
  // 버튼에 해당하는 카테고리에  따라서 가져오는 코드
  const category = event.target.textContent;
  console.log(category);

  pageNo = 1;
  url = new URL(
    `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?cond[continent_eng_nm::EQ]=${category}&ServiceKey=${API_KEY}`
  );

  getApiInformation();

  // const response = await fetch(url);
  // const data = await response.json();

  // InfoList = data.data; //  업데이트 한내용을 infoList 배열에 다시넣고 그려줘야 새롭게  클릭시 해당하는 값들이나온다.
  // render();
  console.log("Ddd", data);
};

const getCountryBySearch = async () => {
  //검색으로  조회에서 가져오는 코드 .
  const search = document.getElementById("search-input").value; //input 검색창에 value값을
  console.log("search", search);
  pageNo = 1;
  const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g.test(search); //먼저, 여러분이 작성한 코드에서 한글과 영어를 판단하는 부분을 살펴보겠습니다. 현재 코드에서 isKorean 변수는 정규식 /[ㄱ-ㅎㅏ-ㅣ가-힣]/g를 사용하여 한글 여부를 확인하고 있습니다. 그러나 이 부분에는 작은 문제가 있습니다.
  //정규식을 사용할 때는 test() 함수를 호출하여 해당 정규식이 문자열에 존재하는지 여부를 확인해야 합니다.

  if (isKorean) {
    url = new URL(
      `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?cond[country_nm::EQ]=${search}&ServiceKey=${API_KEY}`
    );
  } else {
    url = new URL(
      `http://apis.data.go.kr/1262000/TravelAlarmService2/getTravelAlarmList2?cond[country_eng_nm::EQ]=${search}&ServiceKey=${API_KEY}`
    );
  }
  getApiInformation();
  // const response = await fetch(url);
  // const data = await response.json();

  // InfoList = data.data; //  업데이트 한내용을 infoList 배열에 다시넣고 그려줘야 새롭게  클릭시 해당하는 값들이나온다.
  // render();
  console.log("sarcomata", data);
};

// 엔터키를 눌렀을때도 검색이가능하게 하는 부분
document
  .getElementById("search-input")
  .addEventListener("keypress", (event) => {
    // 엔터 키의 keyCode는 13입니다.
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 동작인 폼 제출을 방지합니다.
      getCountryBySearch(); // 검색 기능을 실행합니다.
    }
  });

//검색 창 클릭시 알아서 글자를 지워주는

document.getElementById("search-input").addEventListener("click", function () {
  // Clear the input value only if it's not empty to avoid unnecessary actions
  if (this.value !== "") {
    this.value = "";
  }
});
const render = () => {
  const newInfo = InfoList.map(
    (info) =>
      `<div class="row informal">
        <div class="col-lg-8">
        <section class="flag-box">
          <img  src=${info.flag_download_url} " />
        </section>
        <section class="country-box">  
          <img  src=${info.map_download_url} " />
        </section>
        </div>
        <div class="col-lg-4">
          <ul class="list-unstyled">
            <li>영문 국가명: ${info.country_eng_nm}</li>
            <li>한글 국가명: ${info.country_nm}</li>
            <li>한글 대륙명: ${info.continent_nm}</li>
            <li>영문 대륙명: ${info.continent_eng_nm}</li>
            <li>경보 단계: ${info.alarm_lvl || "없음"}</li>   
            <li>작성일: ${info.written_dt}</li>
            <li>위험지역: ${info.remark || "없음"}</li>
          </ul>
        </div>
      </div>`
  ).join("");
  //  || 없음으로 null값은 없음으로처리할수있게되었다.
  document.getElementById("information-board").innerHTML = newInfo;
};

const errorRender = (errorMessage) => {
  const ErrorHtml = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById("information-board").innerHTML = ErrorHtml;
};

const paginationRender = () => {
  // totalCount
  // pageNo
  //numofRows
  //groupSize

  const pageGroup = Math.ceil(pageNo / groupSize);

  //pageGroup
  //lastPage
  const lastPage = pageGroup * groupSize;

  //totalPages
  const totalPages = Math.ceil(totalCount / numOfRows);

  // 마지막 페이지 그룹이 그룹사이즈보다 작으면 ? lastpage = totalpage

  if (lastPage > totalPages) {
    lastPage = totalPages;
  }
  //firstpage

  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item" onclick="moveToPage(1)"><a class="page-link"><<</a></li>`;

  paginationHTML += ` <li class="page-item" onclick="moveToPage(${
    pageNo - 1
  })"><a class="page-link" ><</a></li>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += `<li class="page-item ${
      i === pageNo ? "active" : " "
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }

  paginationHTML += ` <li class="page-item" onclick="moveToPage(${
    pageNo + 1
  })"><a class="page-link" >></a></li>
   `;

  paginationHTML += `<li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">>></a></li>`;
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  pageNo = pageNum;
  console.log("", pageNo);
  getApiInformation();
};

getApi();

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스가져오기 .
//3. 그뉴스를 보여주기
