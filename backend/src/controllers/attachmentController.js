import { supabase } from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadAttachment = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const user_id = req.user.id;

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const file = req.file;
        const fileName = `${user_id}/${ticketId}/${uuidv4()}-${file.originalname}`;

        // Upload file to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('attachments') // Your bucket name
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
            });

        if (uploadError) throw uploadError;

        // Insert metadata into the 'attachments' table
        const { data: dbData, error: dbError } = await supabase
            .from('attachments')
            .insert([{
                ticket_id: ticketId,
                user_id,
                file_name: file.originalname,
                file_path: uploadData.path,
                file_type: file.mimetype,
                file_size: file.size,
            }])
            .select();

        if (dbError) throw dbError;

        res.status(201).json({ success: true, message: 'File uploaded successfully', attachment: dbData[0] });

    } catch (err) {
        console.error('Error uploading attachment:', err.message);
        res.status(500).json({ success: false, message: 'Server error while uploading attachment' });
    }
};


export const getAttachment = async (req, res) => {
    // Implementation for generating a signed URL or streaming would go here.
    res.status(501).json({ success: false, message: 'Not implemented yet' });
};