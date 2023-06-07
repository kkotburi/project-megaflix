// (1) 작성한 정보 JSON 형식으로 localStorage에 적재하기
const saveData = () => {
  // 입력값 변수 설정
  const writer = document.getElementById("writer").value;
  const password = document.getElementById("pwd").value;
  const average = document.getElementById("average").value;
  const part = document.getElementById("part").value;
  const comment = document.getElementById("comment").value;

  // 입력값 객체에 담기
  let info = {
    writer: writer,
    password: password,
    average: average,
    part: part,
    comment: comment,
  };

  // 기존 데이터 가져오기
  let storedData = localStorage.getItem("myData");
  let infoArray = [];

  // 기존 데이터가 존재하는 경우
  if (storedData !== null) {
    infoArray = JSON.parse(storedData);
  }

  // 새로운 데이터 추가
  infoArray.push(info);

  let jsonData = JSON.stringify(infoArray);
  localStorage.setItem("myData", jsonData);
};

// (2) localStarage에 적재된 데이터 가져와서 화면에 띄우기
const printData = () => {
  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // 관람평 목록 초기화
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

    // 정보 가져와서 화면에 알맞게 표기
    infoArray.forEach((info) => {
      const li = document.createElement("li");
      li.setAttribute("class", "comment");

      const user = document.createElement("div");
      user.setAttribute("class", "user");

      const userImg = document.createElement("div");
      userImg.setAttribute("class", "user-img");
      user.appendChild(userImg);

      const userId = document.createElement("p");
      userId.setAttribute("class", "user-id");
      userId.textContent = info.writer;
      user.appendChild(userId);

      const commentBox = document.createElement("div");
      commentBox.setAttribute("class", "comment-box");

      const commentPoint = document.createElement("div");
      commentPoint.setAttribute("class", "comment-point");
      commentPoint.innerHTML = `<span>${info.average}</span>`;
      commentBox.appendChild(commentPoint);

      const commentRecommend = document.createElement("div");
      commentRecommend.classList.add("comment-recommend");
      commentRecommend.innerHTML = `<em>${info.part}</em>`;
      commentBox.appendChild(commentRecommend);

      const commentTxt = document.createElement("div");
      commentTxt.classList.add("comment-txt");
      commentTxt.textContent = info.comment;
      commentBox.appendChild(commentTxt);

      li.appendChild(user);
      li.appendChild(commentBox);

      commentList.appendChild(li);
    });
  }
};
printData();

// (3) 관람평 등록 버튼을 누르면 saveData -> printData 함수 실행하기
const button = document.querySelector(".write_btn");
button.addEventListener("click", function (event) {
  event.preventDefault();
  saveData();
  printData();

  document.getElementById("writer").value = "";
  document.getElementById("pwd").value = "";
  document.getElementById("average").value = "⭐️";
  document.getElementById("part").value = "배우";
  document.getElementById("comment").value = "";
});
