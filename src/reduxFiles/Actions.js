export const initialBoardData = {
    b1: [
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
}

export const ADDNEWBOARD = 'ADDNEWBOARD'   // 새로운 보드 생성
export const ADDNEWLIST = 'ADDNEWLIST'     // 보드 내 새로운 리스트 생성
export const ADDNEWCARD = 'ADDNEWCARD'     // 리스트 내 새로운 카드 생성

export const CHANGEBOARDTITLE = 'CHANGEBOARDTITLE'     // 보드 제목 변경
export const CHANGELISTTITLE = 'CHANGELISTTITLE'       // 보드 내 특정 리스트 제목 변경
export const CHANGECARDTITLE = 'CHANGECARDTITLE'       // 리스트 내 특정 카드 타이틀 변경
export const CHANGECARDDESCRIPTION = 'CHANGECARDDESCRIPTION'   // 특정 카드의 내용 변경

export const DELETEBOARD = 'DELETEBOARD'       // 보드 삭제
export const DELETELIST = 'DELETELIST'         // 리스트 삭제
export const DELETECARD = 'DELETECARD'         // 카드 삭제

export const AddNewBoard = (board) => ({
    type: ADDNEWBOARD,
    board
});

export const AddNewList = (list) => ({
    type: ADDNEWLIST,
    list
});

export const AddNewCard = (card) => ({
    type: ADDNEWCARD,
    card
});

export const ChangeBoardTitle = (title) => ({
    type: CHANGEBOARDTITLE,
    title
});

export const ChangeListTitle = (title) => ({
    type: CHANGELISTTITLE,
    title
});

export const ChangeCardTitle = (title) => ({
    type: CHANGECARDTITLE,
    title
});

export const ChangeCardDescription = (description) => ({
    type: CHANGECARDDESCRIPTION,
    description
});

export const DeleteBoard = (board) => ({
    type: DELETEBOARD,
    board
});

export const DeleteList = (list) => ({
    type: DELETELIST,
    list
});

export const DeleteCard = (card) => ({
    type: DELETECARD,
    card
});