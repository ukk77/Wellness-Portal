import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

//styling for message component
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

//Message component that is used to display error messages
function Message(props) {
    const classes = useStyles();
    
    return (
        <div>
          {console.log(props.message.message)}
            <Card>
                <CardContent>
                    <Typography variant="body2" component="p">
                        {props.message.msgBody}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Message
