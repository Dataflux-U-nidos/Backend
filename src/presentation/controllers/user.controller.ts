// src/presentation/controllers/user.controller.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  UpdateUserByEmailUseCase,
  DeleteUserUseCase,
  GetStudentsByTutorUseCase,
  AddStudentToTutorUseCase,
  AddInfoManagerToUniversityUseCase,
  AddViewerToUniversityUseCase,
  GetInfoManagersByUniversityUseCase,
  GetViewersByUniversityUseCase,
  AddMarketingToAdminUseCase,
  GetMarketingByAdminUseCase,
  AddSupportToAdminUseCase,
  GetSupportByAdminUseCase,
  AddFinancesToAdminUseCase,
  GetFinancesByAdminUseCase,
  UpdateTestResultUseCase,
  UpdateFinalResultUseCase,
  GetRecommendationsUseCase,
  GetPlatformStatsUseCase,
} from '../../application';
import {
  CreateUserDto,
  UpdateFinalResultDto,
  UpdateTestResultDto,
  UpdateUserDto,
} from '../../application/dtos/user.dto';
import { UserType } from '../../domain/entities/user.entity';

interface RequestWithUser extends Request {
  user?: { id: string; userType: UserType };
}

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updateUserByEmailUseCase: UpdateUserByEmailUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getStudentsByTutorUseCase: GetStudentsByTutorUseCase,
    private readonly addStudentToTutorUseCase: AddStudentToTutorUseCase,
    private readonly addInfoManagerToUniversityUseCase: AddInfoManagerToUniversityUseCase,
    private readonly addViewerToUniversityUseCase: AddViewerToUniversityUseCase,
    private readonly getInfoManagersByUniversityUseCase: GetInfoManagersByUniversityUseCase,
    private readonly getViewersByUniversityUseCase: GetViewersByUniversityUseCase,
    private readonly addMarketingToAdminUseCase: AddMarketingToAdminUseCase,
    private readonly getMarketingByAdminUseCase: GetMarketingByAdminUseCase,
    private readonly addSupportToAdminUseCase: AddSupportToAdminUseCase,
    private readonly getSupportByAdminUseCase: GetSupportByAdminUseCase,
    private readonly addFinancesToAdminUseCase: AddFinancesToAdminUseCase,
    private readonly getFinancesByAdminUseCase: GetFinancesByAdminUseCase,
    private readonly updateTestResultUseCase: UpdateTestResultUseCase,
    private readonly updateFinalResultUseCase: UpdateFinalResultUseCase,
    private readonly getRecommendationsUseCase: GetRecommendationsUseCase,
    private readonly getPlatformStatsUseCase: GetPlatformStatsUseCase,
  ) {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { userType, email } = req.query;
      const typeFilter = typeof userType === 'string' ? userType : undefined;
      const emailFilter = typeof email === 'string' ? email : undefined;

      const users = await this.getAllUsersUseCase.execute({
        userType: typeFilter,
        email: emailFilter,
      });

      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  };

  public getById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const user = await this.getUserByIdUseCase.execute(id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  };

  public create: RequestHandler = async (req: RequestWithUser, res, next) => {
    try {
      const payload = req.body as CreateUserDto;
      const actor = req.user;
      let newUser;
      if (
        actor?.userType === 'ADMIN' &&
        ['MARKETING', 'SUPPORT', 'FINANCES'].includes(payload.userType)
      ) {
        // Admin creates Marketing / Support / Finances
        newUser = await this.createUserUseCase.execute(payload);

        switch (payload.userType) {
          case 'MARKETING':
            await this.addMarketingToAdminUseCase.execute(actor.id, newUser.id);
            break;
          case 'SUPPORT':
            await this.addSupportToAdminUseCase.execute(actor.id, newUser.id);
            break;
          case 'FINANCES':
            await this.addFinancesToAdminUseCase.execute(actor.id, newUser.id);
            break;
        }
      } else if (
        actor?.userType === 'TUTOR' &&
        payload.userType === 'STUDENT'
      ) {
        // Tutor creates Student
        newUser = await this.createUserUseCase.execute(payload);
        await this.addStudentToTutorUseCase.execute(actor.id, newUser.id);
      } else if (
        actor?.userType === 'UNIVERSITY' &&
        payload.userType === 'INFOMANAGER'
      ) {
        // University creates InfoManager
        const withUniv = {
          ...payload,
          universityId: actor.id,
        } as CreateUserDto & { universityId: string };
        newUser = await this.createUserUseCase.execute(withUniv);
        await this.addInfoManagerToUniversityUseCase.execute(
          actor.id,
          newUser.id,
        );
      } else if (
        actor?.userType === 'UNIVERSITY' &&
        payload.userType === 'VIEWER'
      ) {
        // University creates Viewer
        newUser = await this.createUserUseCase.execute(payload);
        await this.addViewerToUniversityUseCase.execute(actor.id, newUser.id);
      } else {
        // Other creations
        newUser = await this.createUserUseCase.execute(payload);
      }

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar usuario por ID
  public updateById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const payload = req.body as UpdateUserDto;
      const updated = await this.updateUserUseCase.execute(id, payload);
      if (!updated) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  // Actualizar la información del usuario logeado
  public update = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User ID is missing' });
        return;
      }
      const payload = req.body as UpdateUserDto;
      const updated = await this.updateUserUseCase.execute(userId, payload);
      if (!updated) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json(updated);
    } catch (error) {
      next(error);
    }
  };

  public updateByEmail = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { email } = req.params;
      const updatedUser = await this.updateUserByEmailUseCase.execute(
        email,
        req.body,
      );

      if (!updatedUser) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      next(error);
    }
  };

  public delete = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User ID is missing' });
        return;
      }
      const deleted = await this.deleteUserUseCase.execute(userId);
      if (!deleted) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getStudentsByTutor = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tutorId = req.user?.id;
      if (!tutorId) {
        res.status(400).json({ message: 'Tutor ID is missing' });
        return;
      }
      const students = await this.getStudentsByTutorUseCase.execute(tutorId);
      res.status(200).json(students);
    } catch (error) {
      next(error);
    }
  };

  public getInfoManagersByUniversity = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const universityId = req.user?.id;
      if (!universityId) {
        res.status(400).json({ message: 'Tutor ID is missing' });
        return;
      }
      const list =
        await this.getInfoManagersByUniversityUseCase.execute(universityId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public getViewersByUniversity = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const universityId = req.user?.id;
      if (!universityId) {
        res.status(400).json({ message: 'Tutor ID is missing' });
        return;
      }
      const list =
        await this.getViewersByUniversityUseCase.execute(universityId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public getMarketingByAdmin = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const adminId = req.user?.id;
      if (!adminId) {
        res.status(400).json({ message: 'Admin ID is missing' });
        return;
      }
      const list = await this.getMarketingByAdminUseCase.execute(adminId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public getSupportByAdmin = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const adminId = req.user?.id;
      if (!adminId) {
        res.status(400).json({ message: 'Admin ID is missing' });
        return;
      }
      const list = await this.getSupportByAdminUseCase.execute(adminId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public getFinancesByAdmin = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const adminId = req.user?.id;
      if (!adminId) {
        res.status(400).json({ message: 'Admin ID is missing' });
        return;
      }
      const list = await this.getFinancesByAdminUseCase.execute(adminId);
      res.status(200).json(list);
    } catch (error) {
      next(error);
    }
  };

  public updateTestResult = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User ID is missing' });
        return;
      }
      const dto = req.body as UpdateTestResultDto;
      const user = await this.updateTestResultUseCase.execute(userId, dto);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  public updateFinalResult = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User ID is missing' });
        return;
      }
      const dto = req.body as UpdateFinalResultDto;
      const user = await this.updateFinalResultUseCase.execute(userId, dto);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };

  public getRecommendations = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(400).json({ message: 'User ID is missing' });
        return;
      }
      const recommendations =
        await this.getRecommendationsUseCase.execute(userId);
      res.status(200).json(recommendations);
    } catch (error) {
      next(error);
    }
  };

  public deleteById = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ message: 'User ID is missing' });
        return;
      }
      const deleted = await this.deleteUserUseCase.execute(id);
      if (!deleted) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  };

  public getAllUniversities = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const universities = await this.getAllUsersUseCase.execute({
        userType: 'UNIVERSITY', // Filtro clave aquí
      });

      res.status(200).json(universities);
    } catch (error) {
      next(error);
    }
  };
  public getUniversityById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    const university = await this.getUserByIdUseCase.execute(req.params.id);
    if (university?.userType !== 'UNIVERSITY') {
      res.status(404).json({ message: 'Universidad no encontrada' });
    }
    res.json(university);
  };

  public getPlatformStats = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const stats = await this.getPlatformStatsUseCase.execute();
      res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  };
}
