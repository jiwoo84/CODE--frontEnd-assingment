# CODE 사전과제

- 지원자 : 곽지우 (<wldn0804@gmail.com>)
- 사용 기술 : `React.js` `Next.js` `Typescript` `recoil` `Tailwind`

## 상세 내용

### 💡 api에서 불러온 데이터를 상태관리 저장소에 저장

- 데이터를 받아올 수 있는 `useFetchData`라는 훅을 생성하여 재사용

- Recoil을 사용하여 atom 생성 (exchanges, Modal 관련 저장소)

- useEffect를 사용하여 컴포넌트 초기 렌더링 시, 데이터를 받아 저장소에 저장하여 전역적으로 관리

### 💡 거래량 기준 정렬

- 거래량을 기준으로 데이터를 정렬하는 `sortExchanges` 함수 생성

- 정렬 옵션에 따라 컴포넌트가 렌더링될 수 있도록 상태값 `sortOrder` 생성

- useEffect를 사용하여 컴포넌트 초기 렌더링 시, 받아진 데이터가 `sortOrder`에 따라 `sortExchanges` 되어 저장소에 저장되도록 구현

```ts
const [sortOrder, setSortOrder] = useState('desc');
const [exchanges, setExchanges] = useRecoilState(exchangesState);

useEffect(() => {
    const fetchExchanges = async () => {
        const exchanges = await useFetchData();
        const sortedExchanges = sortExchanges(exchanges, sortOrder);
        setExchanges(sortedExchanges);
    };

    fetchExchanges();
}, [sortOrder])
```

### 💡 모달

- 모달 열림 여부, 내부 내용 상태를 전역적으로 관리함

- 일부 거래소의 거래쌍 데이터에 중복이 있어 중복 제거 처리

    ```ts
    // 먼저 -/- 형태의 문자열로 만든 후, 중복 제거
    const pairs = modalContent.map(({ base, target }: Ticker) => `${base} / ${target}`)
        .reduce((acc: string[], pair: string) => {
            return acc.includes(pair) ? acc : [pair, ...acc]
        }, [])
    ```

- 모달 외부 클릭시, 모달 제거 처리

    ```ts
    const [modalContent, setModalContent] = useRecoilState(modalContentState);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 모달창 바깥 영역 클릭시, 모달창 닫기
        const handleClickBackground = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setIsModalOpen(false);
                setModalContent([]);
            }
        };

        // 모달 컴포넌트 렌더링 시, 이벤트핸들러 부여
        document.addEventListener('mousedown', handleClickBackground);

        // 모달 컴포넌트 사라질 때, 이벤트핸들러 제거
        return () => {
            document.removeEventListener('mousedown', handleClickBackground);
        };
    });
    ```

### 💡 디자인

- `tailwind`를 사용하여 최소한의 코드로 스타일링함

- 보기 편하도록 UX를 중시하여 UI를 꾸밈

## 파일 구조

```bash
📦src
 ┣ 📂atoms
 ┃ ┣ 📜exchangesState.ts # Exchagnes 데이터가 저장되는 상태값
 ┃ ┗ 📜modalState.ts # 모달 열림 유무, 내부 내용이 저장되는 상태값
 ┣ 📂components
 ┃ ┣ 📜ExchangeRow.tsx # 테이블의 한 행
 ┃ ┣ 📜ExchangesTable.tsx # 테이블
 ┃ ┗ 📜Modal.tsx # 모달
 ┣ 📂hooks
 ┃ ┗ 📜useFetchData.ts # 데이터 받아오는 hook
 ┣ 📂pages
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜_app.tsx
 ┃ ┗ 📜_document.tsx
 ┣ 📂styles
 ┃ ┗ 📜globals.css
 ┣ 📂types
 ┃ ┣ 📜Exchange.ts
 ┃ ┗ 📜Ticker.ts
 ┗ 📂utils
 ┃ ┗ 📜sortExchanges.ts # 거래량으로 오름,내림차순 정렬하는 함수
 ```

## 직접 실행해보기

1. development server 실행

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

2. [http://localhost:3000](http://localhost:3000)로 이동
