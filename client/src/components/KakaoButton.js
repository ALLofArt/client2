import styled from "styled-components";

export default function KakaoButton({ params }) {
  const onClick = () => {
    if (typeof window == "undefined") {
      return alert("카카오로 공유하기에 실패했습니다");
    }
    const { Kakao } = window;
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "나도 알고보니 명화가?!",
        description: "내 그림은 누구의 그림과 닮았을까? Hoxy?!",
        imageUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
        link: {
          mobileWebUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
          webUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
            webUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
            webUrl: `http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/analysis/${params}`,
          },
        },
      ],
    });
  };
  return (
    <div>
      <KakaoShareButton onClick={onClick}>
        <KakaoIcon src="/images/kakao.png" />
      </KakaoShareButton>
    </div>
  );
}

const KakaoShareButton = styled.button`
  cursor: pointer;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 100%;
  padding: 0;
  margin: 0;
`;

const KakaoIcon = styled.img`
  width: 100%;
  height: 100%;
  background-image: center;
`;
