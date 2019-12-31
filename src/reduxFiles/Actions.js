export const ADDNEWBOARD = 'ADDNEWBOARD'   // 새로운 보드 생성
export const ADDNEWLIST = 'ADDNEWLIST'     // 보드 내 새로운 리스트 생성
export const ADDNEWCARD = 'ADDNEWCARD'     // 리스트 내 새로운 카드 생성
export const ADDNEWDESCRIPTION = 'ADDNEWDESCRIPTION' // 카드 내 내용 입력

export const CHANGEBOARDTITLE = 'CHANGEBOARDTITLE'     // 보드 제목 변경
export const CHANGELISTTITLE = 'CHANGELISTTITLE'       // 보드 내 특정 리스트 제목 변경
export const CHANGECARDTITLE = 'CHANGECARDTITLE'       // 리스트 내 특정 카드 타이틀 변경
export const CHANGECARDDESCRIPTION = 'CHANGECARDDESCRIPTION'   // 특정 카드의 내용 변경

export const DELETEBOARD = 'DELETEBOARD'       // 보드 삭제
export const DELETELIST = 'DELETELIST'         // 리스트 삭제
export const DELETECARD = 'DELETECARD'         // 카드 삭제

export const SHOWSTATE = 'SHOWSTATE'            // state 상태 조회

export const AddNewBoard = (boardTitle) => ({
    type: ADDNEWBOARD,
    boardTitle
});

export const AddNewList = (boardTitle, listTitle) => ({
    type: ADDNEWLIST,
    boardTitle,
    listTitle
});

export const AddNewCard = (boardTitle, listTitle, cardTitle) => ({
    type: ADDNEWCARD,
    boardTitle,
    listTitle,
    cardTitle
});

export const AddNewDescription = (boardTitle, listTitle, cardTitle, description) => ({
    type: ADDNEWDESCRIPTION,
    boardTitle,
    listTitle,
    cardTitle,
    description
});

export const ChangeBoardTitle = (oldTitle, newTitle) => ({
    type: CHANGEBOARDTITLE,
    oldTitle,
    newTitle
});

export const ChangeListTitle = (boardTitle, listTitle, newTitle) => ({
    type: CHANGELISTTITLE,
    boardTitle,
    listTitle,
    newTitle
});

export const ChangeCardTitle = (boardTitle, listTitle, cardTitle, newTitle) => ({
    type: CHANGECARDTITLE,
    boardTitle,
    listTitle,
    cardTitle,
    newTitle
});

export const ChangeCardDescription = (boardTitle, listTitle, cardTitle, description) => ({
    type: CHANGECARDDESCRIPTION,
    boardTitle,
    listTitle,
    cardTitle,
    description
});

export const DeleteBoard = (boardTitle) => ({
    type: DELETEBOARD,
    boardTitle
});

export const DeleteList = (boardTitle, listTitle) => ({
    type: DELETELIST,
    boardTitle,
    listTitle
});

export const DeleteCard = (boardTitle, listTitle, cardTitle) => ({
    type: DELETECARD,
    boardTitle,
    listTitle,
    cardTitle
});

export const ShowState = () => ({
    type: SHOWSTATE
})

/*
const initialState = [
    {
        boardTitle: 'a1',
        boardContents : [
            {
                title: 'Things To Do',
                lists: [
                    {contentTitle: '부족한 부분 파악하기', contentText: ''}, 
                    {contentTitle: '복습', contentText: ''}
                ]
            },
            {
                title: 'Doing',
                lists: [
                    {contentTitle: '블로깅하기', contentText: '블로깅 열심히 하자!'}, 
                    {contentTitle: 'TIL 적기', contentText: '빼먹지 말자'}
                ]
            },
            {
                title: 'Done',
                lists: []
            }
        ]
    },
    {
        boardTitle: 'a2',
        boardContents : [
            {
                title: 'Things To Do(a2)',
                lists: [
                    {contentTitle: '부족한 부분 파악하기(a2)', contentText: '(a2)'}, 
                    {contentTitle: '복습(a2)', contentText: ''}
                ]
            },
            {
                title: 'Doing(a2)',
                lists: [
                    {contentTitle: '블로깅하기(a2)', contentText: '블로깅 열심히 하자!(a2)'}, 
                    {contentTitle: 'TIL 적기(a2)', contentText: '빼먹지 말자(a2)'}
                ]
            },
            {
                title: 'Done(a2)',
                lists: []
            }
        ]
    },
]

*/