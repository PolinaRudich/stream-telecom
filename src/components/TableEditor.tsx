import { useEffect, useRef, useState } from "react";
import { Draggable, DragDropContext, Droppable, DropResult } from "react-beautiful-dnd"
import { DragdropItem } from "../models";
import '../components/TableEditor.scss';
import jsonData from '../data.json';
import { ActionButton, ActionsContainerStyled, DragdropContainer, DragdropItemStyled, Input, TextareaStyled } from "./styled/DragnDropStyled";
import { SvgDragndrop } from "../svg/SvgDragndrop";
import { SvgRemoveItem } from "../svg/SvgRemoveItem";
import { addNewData, addNewDragItem, editExistingDragItem, exportData, getDataToShowFromJSON, removeDragItem, reorder } from "../actions/actions";

export const TableEditor = () => {
    const [currentData, setCurrentData] = useState<string>('');
    const ref = useRef();
    const [textareaRef, setTextareaRef] = useState<any>();
    const [state, setState] = useState<DragdropItem[]>();

    useEffect(() => {
        // устанавливаем начальную ссылку
        setTextareaRef(ref);
        // подгрузка данных json
        const data = getDataToShowFromJSON(JSON.parse(JSON.stringify(jsonData)));
        data && setState(data);
    }, []);

    const setStateFunction = (data: DragdropItem[]) => {
        setState(data);
    }

    const setCurrentDataFunction = (data: string) => {
        setCurrentData(data);
    }


    const onDragEnd = (result: DropResult): void => {
        if (!result.destination) {
            return;
        }

        const items: any = reorder(
            state,
            result.source.index,
            result.destination.index
        );

        setState(items);
    };

    const onChangeTextareaFunction = async (data: string) => {
        setCurrentData(data)
        resizeTextareaAutomatically()

    };

    const resizeTextareaAutomatically = () => {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        setTextareaRef(textareaRef);
    }

    const putIntoTextArea = async () => {
        if (state) {
            const dataToShow: any[] = state?.map((item: DragdropItem) => {
                const element = { name: item.name, value: item.value };
                return element;
            });
            await onChangeTextareaFunction(JSON.stringify(dataToShow));
            resizeTextareaAutomatically();

        };


    }
    const onClickLink = () => {

    }
    const onClickLinkWithPreventDefault = (e: any) => {
        e.preventDefault();
    }
    return <DragdropContainer>
        <DragDropContext onDragEnd={onDragEnd} key="editor2">
            <Droppable droppableId="droppable">
                {(provided): JSX.Element => (
                    <div
                        className="step-item"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {state?.map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                                {(provided) => (
                                    (
                                        <div ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <DragdropItemStyled
                                            >
                                                <SvgDragndrop />
                                                <Input
                                                    data-hide
                                                    key={`${item.name}_${item.id}`}
                                                    defaultValue={item.name}
                                                    type="text"
                                                    onBlur={(e) => {
                                                        editExistingDragItem(e.target.value, item, 'name', state, setStateFunction);
                                                    }}
                                                />
                                                <Input
                                                    data-hide
                                                    key={`${item.value}_${item.id}`}
                                                    defaultValue={item.value}
                                                    type="text"
                                                    onBlur={(e) => editExistingDragItem(e.target.value, item, 'value', state, setStateFunction)} />

                                                <div onClick={(e) => { removeDragItem(item.id, state, setStateFunction); }}>
                                                    <SvgRemoveItem />
                                                </div>
                                            </DragdropItemStyled>
                                        </div>
                                    )
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

        <ActionsContainerStyled className="flex-container">
            <TextareaStyled
                className="scroll"
                onInput={resizeTextareaAutomatically}
                ref={textareaRef}
                data-attr
                onChange={(e: any) => onChangeTextareaFunction(e.target.value)}
                value={currentData}
            ></TextareaStyled>
            <div className="flex-container">
                <ActionButton onClick={() => addNewDragItem(state, setStateFunction)}>press to add</ActionButton>
                <ActionButton onClick={() => exportData(state)}>
                    Export Data
                </ActionButton>

                <ActionButton onClick={() => addNewData(state, currentData, setStateFunction, setCurrentDataFunction, textareaRef, onChangeTextareaFunction)}>
                    add to list json data
                </ActionButton>
                <ActionButton onClick={putIntoTextArea}>
                    put into textarea
                </ActionButton>
            </div>

        </ActionsContainerStyled>
        <a href="https://chrome.google.com/" style={{ marginRight: '20px' }} onClick={onClickLink}>Link without preventDefault()</a>
        <a href="https://chrome.google.com/" onClick={(e) => onClickLinkWithPreventDefault(e)}>Link with preventDefault()</a>
        <p>click links</p>
        <p>test 1() вернет Cool, так как оба значения истинны, оператор 'и' возвращает значения</p>
        <p>test 2() вернет true, так как оператор увидит первое истинное значение</p>
    </DragdropContainer>
}

