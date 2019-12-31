export const ListActions = {
    ADD_NEW_LIST: 'ADD_NEW_LIST',   // 새로운 보드 생성
    CHANGE_LIST_TITLE: 'CHANGE_LIST_TITLE',     // 보드 제목 변경
    DELETE_LIST: 'DELETE_LIST'       // 보드 삭제
}

export const AddNewBoard = (boardTitle, listTitle) => ({
    type: ListActions.ADD_NEW_LIST,
    listTitle
});

export const ChangeListTitle = (boardTitle, listTitle, newTitle) => ({
    type: ListActions.CHANGE_LIST_TITLE,
    boardTitle,
    listTitle,
    newTitle
});

export const DeleteList = (boardTitle, listTitle) => ({
    type: ListActions.DELETE_LIST,
    boardTitle,
    listTitle
});