import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard(props) {
    const cardStyle = {
        width: '300px',
        height: '130px',
        padding: '30px 50px',
        margin: '25px auto',
    }

    const handleCheck = (e) => {
        let id = e.target.id;
        id = id.substring(3, id.length);
        let elem = document.getElementById(id);
        let nameOfTarget = elem.firstChild.firstChild;
        nameOfTarget.style.textDecoration === 'none' ? nameOfTarget.style.textDecoration = 'line-through' : nameOfTarget.style.textDecoration = 'none';
    }

    const handleDelete = (e) => {
        let id = e.target.id;
        fetch(`http://localhost:8080/todos/delete/${id}`,
            { method: 'DELETE'}
        );
        props.refresh();
    }

    return (
        <Card sx={{ maxWidth: 345 }} style={cardStyle} id={props.id}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" style={props.completed ? {textDecoration: 'line-through'} : {textDecoration: 'none'}}>
                    {props.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {props.description}
                </Typography>
                <Typography variant="body3" color="text.primary">
                    Added on: {props.addedOn}
                </Typography>
            </CardContent>
            <CardActions>
                Completed <input type="checkbox" value="Completed" defaultChecked={props.completed} onClick={handleCheck} id={'com'+props.id}></input>
                <Button variant='contained' style={{background: 'red', width: '2%', height: '3%', }} onClick={handleDelete} id={props.id}>DELETE</Button>
            </CardActions>
        </Card>
    );
}
