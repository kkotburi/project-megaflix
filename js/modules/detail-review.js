// (1) 작성한 정보 JSON 형식으로 localStorage에 적재하기
export const saveData = () => {
  // 입력값 변수 설정
  const movieId = document.querySelector(".moviebox").id;
  const writer = document.getElementById("writer").value;
  const password = document.getElementById("pwd").value;
  const average = document.getElementById("average").value;
  const part = document.getElementById("part").value;
  const comment = document.getElementById("comment").value;

  // 입력값 객체에 담기
  let uuid = self.crypto.randomUUID();
  let info = {
    commentId: uuid,
    movieId: movieId,
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
export const printData = () => {
  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // 필터링
    const urlParams = new URLSearchParams(window.location.search);
    const urlMovieId = urlParams.get("id");

    const filteredInfoArray = infoArray.filter(
      (data) => data.movieId === urlMovieId
    );

    // 관람평 목록 초기화
    const commentList = document.querySelector(".comment-list");
    commentList.innerHTML = "";

    // 필터링된 데이터를 가져와서 화면에 표기
    filteredInfoArray.reverse().forEach((info) => {
      const li = document.createElement("li");
      li.setAttribute("class", "comment");
      li.setAttribute("id", info.commentId);

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
      commentRecommend.setAttribute("class", "comment-recommend");
      commentRecommend.innerHTML = `<em>${info.part}</em>`;
      commentBox.appendChild(commentRecommend);

      const commentTxt = document.createElement("div");
      commentTxt.setAttribute("class", "comment-txt");
      commentTxt.textContent = info.comment;
      commentBox.appendChild(commentTxt);

      const plus = document.createElement("div");

      const edit = document.createElement("div");
      edit.innerHTML = `<button class="edit-btn">수정</button>`;
      plus.appendChild(edit);

      const deleteBtn = document.createElement("div");
      deleteBtn.innerHTML = `<button class="delete-btn">삭제</button>`;
      deleteBtn.addEventListener("click", function () {
        deleteComment();
      });
      plus.appendChild(deleteBtn);

      li.appendChild(user);
      li.appendChild(commentBox);
      li.appendChild(plus);

      commentList.appendChild(li);
    });
  }
};
printData();

// (3) 관람평 등록 버튼을 누르면
//     입력사항 검사 후 saveData() => printData() 함수 실행하기
export const button = document.querySelector(".write_btn");
button.addEventListener("click", function (event) {
  event.preventDefault();

  const writer = document.getElementById("writer").value;
  const password = document.getElementById("pwd").value;
  const average = document.getElementById("average").value;
  const part = document.getElementById("part").value;
  const comment = document.getElementById("comment").value;

  // 사용자 입력 검사
  if (!writer || !password || !average || !part || !comment) {
    alert("항목을 모두 입력해주세요!");
    return;
  }
  if (!/^\d+$/.test(password)) {
    alert("비밀번호는 숫자로 입력해주세요");
    return;
  }
  if (password.length !== 4) {
    alert("비밀번호는 4자리로 입력해주세요");
    return;
  }

  saveData();
  printData();

  document.getElementById("writer").value = "";
  document.getElementById("pwd").value = "";
  document.getElementById("average").value = "⭐️";
  document.getElementById("part").value = "배우";
  document.getElementById("comment").value = "";
});
printData();

// (4) 리뷰 삭제

const deleteComment = () => {
  // 비밀번호 입력 받기
  let password = prompt("비밀번호를 입력하세요");

  // 저장된 데이터 가져오기
  let storedData = localStorage.getItem("myData");

  // 저장된 데이터가 있는 경우
  if (storedData !== null) {
    let infoArray = JSON.parse(storedData);

    // commnetid와 localstorage의 id가 같은지 확인
    const commentId = document.querySelector(".comment").id;
    const filteredComment = infoArray.find(
      (data) => data.commentId === commentId
    );

    // 패스워드가 확인
    if (filteredComment && filteredComment.password === password) {
      infoArray = infoArray.filter((data) => data.commentId !== commentId);
      let jsonData = JSON.stringify(infoArray);
      localStorage.setItem("myData", jsonData);

      printData();
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  }
};
