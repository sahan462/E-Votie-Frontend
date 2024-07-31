import React, { useState } from 'react';
import { 
  LinearProgress, Box, Typography, Paper, Grid, Avatar,
  Select, MenuItem, IconButton, Button, Chip, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import BookmarkIcon from '@mui/icons-material/Bookmark';

export const PromiseCard = ({ date, title, description, progress, score, initialStatus = 'Pending' }) => {
  const [status, setStatus] = useState(initialStatus);
  const [attachments, setAttachments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleAttachmentUpload = (event) => {
    const newAttachments = Array.from(event.target.files);
    setAttachments([...attachments, ...newAttachments]);
  };

  const handleRemoveAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSaveEdit = () => {
    // Here you would typically save the changes to your backend
    setEditMode(false);
  };

  const handleDelete = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = () => {
    // Here you would typically delete the promise from your backend
    handleCloseDialog();
  };

  const statusColors = {
    'Pledge Completed': 'success',
    'Partially Completed': 'warning',
    'Not Done': 'error',
    'Pending': 'info'
  };

  return (
    <Paper elevation={3} className="p-2 mb-4">
        <Grid container spacing={2}>
            <Grid item xs={12} sm={2}>
                <Box 
                    sx={{ 
                    backgroundColor: 'gray', 
                    color: 'white', 
                    padding: '8px', 
                    borderRadius: '8px', 
                    textAlign: 'center'
                    }}
                    className="flex items-center justify-center w-fit"
                >
                    <Typography variant="h6">
                        {/* <BookmarkIcon /> */}
                        {date}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12} sm={10}>
                {editMode ? (
                    <TextField
                    fullWidth
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    margin="normal"
                    />
                ) : (
                    <Typography variant="h6" gutterBottom>{title}</Typography>
                )}
                {editMode ? (
                    <TextField
                    fullWidth
                    multiline
                    rows={2}
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                    margin="normal"
                    />
                ) : (
                    <Typography variant="body1" color="textSecondary" gutterBottom>{description}</Typography>
                )}
                <Box display="flex" alignItems="center" mt={2}>
                    <LinearProgress variant="determinate" value={progress} style={{ flex: 1, marginRight: 10 }} color='success'/>
                    <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                    <Typography variant="body2" color="textSecondary">Score: {score}</Typography>
                    <Select
                    value={status}
                    onChange={handleStatusChange}
                    size="small"
                    >
                    <MenuItem value="Pledge Completed">Pledge Completed</MenuItem>
                    <MenuItem value="Partially Completed">Partially Completed</MenuItem>
                    <MenuItem value="Not Done">Not Done</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    </Select>
                </Box>
                <Box mt={2}>
                    <input
                    accept="image/*,application/pdf"
                    style={{ display: 'none' }}
                    id={`attachment-button-${title}`}
                    type="file"
                    onChange={handleAttachmentUpload}
                    multiple
                    />
                    <label htmlFor={`attachment-button-${title}`}>
                    <Button variant="outlined" component="span" startIcon={<AttachFileIcon />}>
                        Upload Attachment
                    </Button>
                    </label>
                </Box>
                <Box mt={2} display="flex" flexWrap="wrap" gap={1}>
                    {attachments.map((file, index) => (
                    <Chip
                        key={index}
                        label={file.name}
                        onDelete={() => handleRemoveAttachment(index)}
                        color="primary"
                        variant="outlined"
                    />
                    ))}
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    {editMode ? (
                    <Button onClick={handleSaveEdit} color="primary">Save</Button>
                    ) : (
                    <IconButton onClick={handleEdit} size="small">
                        <EditIcon />
                    </IconButton>
                    )}
                    <IconButton onClick={handleDelete} size="small">
                    <DeleteIcon />
                    </IconButton>
                </Box>
            </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this promise?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};