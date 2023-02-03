import { DropResult } from "react-beautiful-dnd";
import { DragdropItem } from "../models";

export const getDataToShowFromJSON = (data: any) => {
    if (Array.isArray(data)) {
        const newArray = data.map((el, index) => {
            const { name, value } = el;
            return {
                id: index + 1,
                position: index + 1,
                name: name,
                value: value
            }
        });
        return newArray;
    } else { return }
};

export const reorder = (
    list: any,
    startIndex: number,
    endIndex: number,
): any => {
    const result: DragdropItem[] = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

export const exportData = (state: DragdropItem[] | undefined) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(state)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";
    link.click();
};

export const editExistingDragItem = (inputValue: string, item: DragdropItem, editInputName: string, state: DragdropItem[] | undefined, setStateFunction: (state: DragdropItem[]) => void) => {
    let newDataItem: DragdropItem = {
        id: item.id,
        name: editInputName === 'name' ? inputValue : item.name,
        position: item.position,
        value: editInputName === 'value' ? inputValue : item.value
    };
    if (state) {
        const editedState = [...state].map((dragItem: DragdropItem) => {
            if (item.id === dragItem.id) {
                return Object.assign({}, newDataItem);
            } else {
                return Object.assign({}, dragItem);
            }
        });
        setStateFunction([...editedState]);
    }

};


export const addNewDragItem = (state: DragdropItem[] | undefined, setStateFunction: (state: DragdropItem[]) => void) => {

    if (state) {
        let newDataItem: DragdropItem = { id: state.length + 1, position: state.length + 1, name: 'enter the name', value: 'enter the value' };
        const neww = state.map((item: DragdropItem) => {
            return Object.assign({}, item)
        })
        neww.push(newDataItem);
        setStateFunction(neww)
    }
}

export const removeDragItem = (itemId: number, state: DragdropItem[] | undefined, setStateFunction: (state: DragdropItem[]) => void) => {
    if (state) {
        const neww = [...state]
            .filter((item: DragdropItem) => { return item.id !== itemId })
            .map((item: DragdropItem, index) => {
                const changedItem: DragdropItem = { id: index + 1, position: index + 1, name: item.name, value: item.value }
                return changedItem;
            });
        console.log(neww);
        setStateFunction(neww);
    }
};

export const addNewData = (state: DragdropItem[] | undefined, currentData: string, setStateFunction: (state: DragdropItem[]) => void, setCurrentDataFunction: (data: string) => void, textareaRef: any, onChangeTextAreaFunction: (data: string) => void) => {
    try {
        if (state) {
            if (Array.isArray(JSON.parse(currentData))) {
                let countInArrayResult = state?.length;
                let formatted = [...JSON.parse(currentData)].map((item) => {

                    const newDragdropdata: DragdropItem = {
                        id: countInArrayResult + 1,
                        name: item.name,
                        value: item.value,
                        position: countInArrayResult + 1,
                    }
                    countInArrayResult++;
                    return newDragdropdata;
                });
                setStateFunction([...state, ...formatted]);
            } else if (typeof JSON.parse(currentData) === 'object') {
                let formattedItem = JSON.parse(currentData);
                const newDragdropdata: DragdropItem = {
                    id: state?.length + 1,
                    name: formattedItem.name,
                    value: formattedItem.value,
                    position: state?.length + 1,
                };
                setStateFunction([...state, newDragdropdata]);
            };
            setCurrentDataFunction('');
            textareaRef.current.style.height = 'auto';
        }
    } catch (e: any) {

        onChangeTextAreaFunction('it is not valid json data');
        textareaRef.current.style.height = 'auto';
    }
};