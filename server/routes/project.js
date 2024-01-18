const express = require('express');
const router = express.Router();
const ProjectController = require( '../controllers/ProjectController' );
const AuthController = require('../controllers/AuthController');

router.get('',AuthController.checkLogin,ProjectController.getProjects);
router.post('/create-project',AuthController.checkLogin,ProjectController.createProject);
router.get('/get-project',AuthController.checkLogin,ProjectController.getProject);
router.get('/project/team-members-names',AuthController.checkLogin,ProjectController.getTeamMembersName);
router.get('/project/team',AuthController.checkLogin,ProjectController.getTeamInfo);
router.post('/project/add-member',AuthController.checkLogin,ProjectController.addTeamMember);




router.get('/tasks',AuthController.checkLogin,ProjectController.getTasks);
router.post('/tasks/create-task',AuthController.checkLogin,ProjectController.createTask);
router.get('/tasks/get-task',AuthController.checkLogin,ProjectController.getTask);
router.post('/task/save-task',AuthController.checkLogin,ProjectController.saveTask);
router.post('/task/change-assignee',AuthController.checkLogin,ProjectController.changeAssignee);
router.post('/task/post-comment',AuthController.checkLogin,ProjectController.postComment);
router.post('/task/delete-comment',AuthController.checkLogin,ProjectController.deleteComment);









module.exports = router;