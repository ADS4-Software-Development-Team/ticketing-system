import { createUser, getAllUsers, getUserById } from './models/userModel.js'
import { createTicket, getAllTickets, getTicketById } from './models/ticketModel.js'
import { addComment, getCommentsByTicket } from './models/commentModel.js'
import { addAttachment, getAttachmentsByTicket } from './models/attachmentModel.js'
import { addTicketLog, getLogsByTicket } from './models/ticketLogModel.js'
import { addLoginLog, getLogsByUser } from './models/loginLogModel.js'

const testModels = async () => {
  try {
    console.log('--- Testing Users ---')
    const user = await createUser({
      full_name: 'Test User',
      email: 'testuser55@example.com',
      password: 'password123',
      role: 'normal_user',
      created_by: null
    })
    console.log('Created User:', user)

    const users = await getAllUsers()
    console.log('All Users:', users)

    const userById = await getUserById(user._id)
    console.log('Get User by ID:', userById)

    console.log('--- Testing Tickets ---')
    const ticket = await createTicket({
      user_id: user._id,
      assigned_to: null,
      title: 'Test Ticket',
      description: 'This is a test ticket',
      category: 'General',
      priority: 'Low',
      status: 'Open'
    })
    console.log('Created Ticket:', ticket)

    const tickets = await getAllTickets()
    console.log('All Tickets:', tickets)

    const ticketById = await getTicketById(ticket._id)
    console.log('Get Ticket by ID:', ticketById)

    console.log('--- Testing Comments ---')
    const comment = await addComment({
      ticket_id: ticket._id,
      commented_by: user._id,
      comment_text: 'This is a test comment'
    })
    console.log('Added Comment:', comment)

    const comments = await getCommentsByTicket(ticket._id)
    console.log('Comments for Ticket:', comments)

    console.log('--- Testing Attachments ---')
    const attachment = await addAttachment({
      ticket_id: ticket._id,
      uploaded_by: user._id,
      file_path: '/path/to/file.txt'
    })
    console.log('Added Attachment:', attachment)

    const attachments = await getAttachmentsByTicket(ticket._id)
    console.log('Attachments for Ticket:', attachments)

    console.log('--- Testing Ticket Logs ---')
    const log = await addTicketLog({
      ticket_id: ticket._id,
      action_by: user._id,
      action_type: 'Created',
      remarks: 'Ticket created successfully'
    })
    console.log('Added Ticket Log:', log)

    const ticketLogs = await getLogsByTicket(ticket._id)
    console.log('Ticket Logs for Ticket:', ticketLogs)

    console.log('--- Testing Login Logs ---')
    const loginLog = await addLoginLog({
      user_id: user._id,
      login_time: new Date(),
      ip_address: '127.0.0.1'
    })
    console.log('Added Login Log:', loginLog)

    const loginLogs = await getLogsByUser(user._id)
    console.log('Login Logs for User:', loginLogs)

  } catch (err) {
    console.error('Error testing models:', err.message)
  }
}

testModels()
