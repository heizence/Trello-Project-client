export const BoardActions = {
    ADD_NEW_BOARD: 'ADD_NEW_BOARD',   // 새로운 보드 생성
    CHANGE_BOARD_TITLE: 'CHANGE_BOARD_TITLE',     // 보드 제목 변경
    DELETE_BOARD: 'DELETE_BOARD'       // 보드 삭제
}

export const AddNewBoard = (boardTitle) => ({
    type: BoardActions.ADD_NEW_BOARD,
    boardTitle
});

export const ChangeBoardTitle = (oldTitle, newTitle) => ({
    type: BoardActions.CHANGE_BOARD_TITLE,
    oldTitle,
    newTitle
});

export const DeleteBoard = (boardTitle) => ({
    type: BoardActions.DELETE_BOARD,
    boardTitle
});