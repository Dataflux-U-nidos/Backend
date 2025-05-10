//Casos de uso específicos

//Use cases educational institution
export * from './educationalInstitution/createEducationalInstitution.useCase';
export * from './educationalInstitution/deleteEducationalInstitution.useCase';
export * from './educationalInstitution/getEducationalInstitutionById.useCase';
export * from './educationalInstitution/getAllEducationalInstitution.useCase';
export * from './educationalInstitution/updateEducationalInstitution.useCase';
//Use cases major
export * from '../use-cases/major/create-major.use-case';
export * from '../use-cases/major/get-all-majors.use-case';
export * from '../use-cases/major/get-major-by-id.use-case';
export * from '../use-cases/major/update-major.use-case';
export * from '../use-cases/major/delete-major.use-case';
export * from './major/get-majors-by-institution.use-case';
export * from './major/add-job-opportunity-to-major.use-case';
//Use cases job opportunity
export * from './jobOpportunity/createJobOpportunity.useCase';
export * from './jobOpportunity/deleteJobOpportunity.useCase';
export * from './jobOpportunity/getAllJobOpportunity.useCase';
export * from './jobOpportunity/getJobOpportunityById.useCase';
export * from './jobOpportunity/updateJobOpportunity.useCase';
//Use cases user
export * from '../use-cases/user/create-user.use-case';
export * from '../use-cases/user/delete-user.use-case';
export * from '../use-cases/user/get-all-users.use-case';
export * from '../use-cases/user/get-user-by-id.use-case';
export * from '../use-cases/user/get-user-by-email.use-case';
export * from '../use-cases/user/update-user.use-case';
export * from '../use-cases/user/update-user-by-email.use-case';
export * from '../use-cases/comment/create-comment.use-case';
export * from '../use-cases/user/get-students-by-tutor.use-case';
export * from '../use-cases/user/add-student-to-tutor.use-case';
export * from '../use-cases/user/add-infomanager-to-university.use-case';
export * from '../use-cases/user/add-viewer-to-university.use-case';
export * from '../use-cases/user/get-viewers-by-university.use-case';
export * from '../use-cases/user/get-infomanagers-by-university.use-case';
export * from '../use-cases/user/add-finances-to-admin.use-case';
export * from './user/get-finances-by-admin.use-case';
export * from '../use-cases/user/add-marketing-to-admin.use-case';
export * from '../use-cases/user/get-marketing-by-admin.use-case';
export * from '../use-cases/user/add-support-to-admin.use-case';
export * from '../use-cases/user/get-support-by-admin.use-case';
export * from '../use-cases/user/update-test-result.use-case';
export * from '../use-cases/user/update-final-result.use-case';
// Use cases comment
export * from './comment/get-all-comments.use-case';
export * from '../use-cases/comment/get-comment-by-id.use-case';
export * from '../use-cases/comment/update-comment.use-case';
export * from '../use-cases/comment/delete-comment.use-case';
export * from '../use-cases/comment/get-comments-by-major.use-case';
// Use cases auth
export * from './auth/login.use-case';
export * from './auth/getSession.useCase';
export * from './auth/refreshToken.useCase';

// Use cases email
export * from './email/sendRecoveryEmail.useCase';

// Use cases campaign
export * from './campaign/create-campaign.use-case';
export * from './campaign/delete-campaign.use-case';
export * from './campaign/get-all-campaigns.use-case';
export * from './campaign/get-campaigns-by-id.use-case';
export * from './campaign/get-campaigns-by-user.use-case';
export * from './campaign/update-campaign.use-case';
export * from './campaign/get-total-investment.use-case';

// Use cases subscription plan
export * from './suscriptionPlan/create-subscription-plan.use-case';
export * from './suscriptionPlan/delete-subscription-plan.use-case';
export * from './suscriptionPlan/get-all-subscription-plans.use-case';
export * from './suscriptionPlan/get-subscription-plan-by-id.use-case';
export * from './suscriptionPlan/update-subscription-plan.use-case';
export * from './suscriptionPlan/get-revenue-by-plan.use-case';
export * from './suscriptionPlan/get-total-revenue.use-case';

// Use cases test
export * from './studentTest/psychometric.use-case';
export * from './studentTest/vocational.use-case';
export * from './studentTest/vocational-partial.use-case';
