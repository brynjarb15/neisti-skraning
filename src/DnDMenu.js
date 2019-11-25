import React from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import DnDColumn from './DnDColumn';
import initalData from './initial-data';


const Container = styled.div`
    display: flex;
`;

// Used and learned allot about this from here https://egghead.io/courses/beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd

export default class DnDMenue extends React.Component {
    state = initalData;


    onDragStart = start => {
    };

    onDragUpdate = update => {
    }


    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        // If there is no destination we don't have to update anything
        if (!destination) {
            return;
        }


        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            // Item was dragged and then dropped in the same place
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColmn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColmn.id]: newColmn
                }
            };
            this.props.updateEvents(newState);
            this.setState(newState);

            return;
        }
        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        };
        this.props.updateEvents(newState);
        this.setState(newState);

        return;


    }

    render() {
        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
                onDragStart={this.onDragStart}
                onDragUpdate={this.onDragUpdate}
            >
                <Container>
                    {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);

                        return <DnDColumn key={column.id} column={column} tasks={tasks} />;
                    })}
                </Container>
            </DragDropContext>
        );
    }
}