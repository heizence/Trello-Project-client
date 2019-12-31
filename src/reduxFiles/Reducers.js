import { 
    ADDNEWBOARD, ADDNEWLIST, ADDNEWCARD, ADDNEWDESCRIPTION,
    CHANGEBOARDTITLE, CHANGELISTTITLE, CHANGECARDTITLE, CHANGECARDDESCRIPTION,
    DELETEBOARD, DELETELIST, DELETECARD  } from "./Actions"


var initialState = [
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

export function Add(state = initialState, action) {
    let stateToChange = state

    switch (action.type) {
        case ADDNEWBOARD: 
            return [
                ...state,
                {
                    boardTitle: action.boardTitle,
                    boardContents: []
                }
            ]       

        case ADDNEWLIST: 
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    stateToChange[i].boardTitle.boardContents.push({
                        title: action.listTitle
                    })
                    break
                }
            }
            return stateToChange

        case ADDNEWCARD:
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            stateToChange[i].boardContents[j].lists.push({
                                contentTitle: action.cardTitle,
                                contentText: ''
                            })
                            break
                        }
                    }
                    break
                }                
            }
            return stateToChange
            
        case ADDNEWDESCRIPTION:
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            stateToChange[i].boardContents[j].lists.push({
                                contentTitle: action.cardTitle,
                                contentText: action.description
                            })
                            break
                        }
                    }
                    break
                }                
            }
            return stateToChange

        default: 
            return state    
    }
}

// 수정
export function Change(state = initialState, action) {
    let stateToChange = state

    switch (action.type) {
        case CHANGEBOARDTITLE: 
            console.log('리듀서에서 확인 : ', action)
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.oldTitle) {
                    stateToChange[i].boardTitle = action.newTitle
                    
                    break
                }
            }
            return stateToChange

        case CHANGELISTTITLE: 
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            stateToChange[i].boardContents[j].title = action.newTitle
                            
                            break
                        }
                    }
                    break
                }
            }
            return stateToChange

        case CHANGECARDTITLE:
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            for (let k=0; k<stateToChange[i].boardContents[j].lists.length; k++) {
                                if (stateToChange[i].boardContents[j].lists[k].contentTitle === action.cardTitle) {
                                    stateToChange[i].boardContents[j].lists[k].contentTitle = action.newTitle

                                    break
                                }
                            }
                            break
                        }
                    }
                    break
                }                
            }
            return stateToChange

        case CHANGECARDDESCRIPTION:
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            for (let k=0; k<stateToChange[i].boardContents[j].lists.length; k++) {
                                if (stateToChange[i].boardContents[j].lists[k].contentTitle === action.cardTitle) {
                                    stateToChange[i].boardContents[j].lists[k].contentText = action.description

                                    break
                                }
                            }
                            break
                        }
                    }
                    break
                }                
            }
            return stateToChange

        default: 
            return state    
              
    }
}

// 삭제
export function Delete(state=initialState, action) {
    let stateToChange = state

    switch (action.type) {
        case DELETEBOARD: 
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    stateToChange.splice(i, 1)
                    
                    break
                }
            }
            return stateToChange

        case DELETELIST: 
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            stateToChange[i].boardContents.splice(j, 1)
                            
                            break
                        }
                    }
                    break
                }
            }
            return stateToChange

        case DELETECARD:
            for (let i=0; i<stateToChange.length; i++) {
                if (stateToChange[i].boardTitle === action.boardTitle) {
                    for (let j=0; j<stateToChange[i].boardContents.length; j++) {
                        if (stateToChange[i].boardContents[j].title === action.listTitle) {
                            for (let k=0; k<stateToChange[i].boardContents[j].lists.length; k++) {
                                if (stateToChange[i].boardContents[j].lists[k].contentTitle === action.cardTitle) {
                                    stateToChange[i].boardContents[j].lists.splice(k, 1)

                                    break
                                }
                            }
                            break
                        }
                    }
                    break
                }                
            }
            return stateToChange

        default: 
            return state    
              
    }
}