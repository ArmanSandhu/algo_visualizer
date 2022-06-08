import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function ModalDialog(props) {
    const { showState, sortOptions, selection, onClose } = props;

    const handleListItemClick = (value) => {
        onClose(value);
    }

    const handleClose = () => {
        onClose(selection);
    }

    return (
        <div>
            <Dialog onClose = {handleClose} open={showState}>
                <DialogTitle>Choose Sort Method</DialogTitle>
                <List sx={{pt: 0}}>
                    {sortOptions.map((method) => (
                        <ListItem button onClick={() => handleListItemClick(method) } key={method}>
                            <ListItemText primary={method} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        </div>
    );
}