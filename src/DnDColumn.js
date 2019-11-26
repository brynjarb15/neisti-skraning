import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import DnDTask from './DnDTask';

const Container = styled.div`
    margin-right: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 400px;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;

    min-height: 100px;
`;

const ChosenTaskList = styled.div`
`;

class InnerList extends React.Component {
    // Only update current task
    shouldComponentUpdate(nextProps) {
        if (nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render() {
        return this.props.tasks.map((task, index) => {
            return <DnDTask key={task.id} task={task} index={index} currentIndex={index} columnId={this.props.columnId} />
        }
        );
    }

}


export default class DnDColumn extends React.Component {
    render() {
        return (
            <Container>
                <Title>{this.props.column.title}</Title>
                <Droppable droppableId={this.props.column.id} >
                    {(provided, snapshot) => (
                        <TaskList
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver={snapshot.isDraggingOver}
                        >
                            <InnerList tasks={this.props.tasks} columnId={this.props.column.id} />
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
            </Container>
        );
    }
}

