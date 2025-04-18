import { Request, Response, NextFunction, RequestHandler } from 'express';
import {
  CreateUserUseCase,
  GetAllUsersUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  GetStudentsByTutorUseCase,
  AddStudentToTutorUseCase,
  AddInfoManagerToUniversityUseCase,
  AddViewerToUniversityUseCase,
  GetInfoManagersByUniversityUseCase,
  GetViewersByUniversityUseCase,
  CreateUserDto,
} from '../../application';
import { UserType } from '../../domain';

interface RequestWithUser extends Request {
  user: {
    id: string;
    userType: UserType;
  };
}

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getStudentsByTutorUseCase: GetStudentsByTutorUseCase,
    private readonly addStudentToTutorUseCase: AddStudentToTutorUseCase,
    private readonly addInfoManagerToUniversityUseCase: AddInfoManagerToUniversityUseCase,
    private readonly addViewerToUniversityUseCase: AddViewerToUniversityUseCase,
    private readonly getInfoManagersByUniversityUseCase: GetInfoManagersByUniversityUseCase,
    private readonly getViewersByUniversityUseCase: GetViewersByUniversityUseCase,
  ) {}

  public getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { type, email } = req.query;
      // Verifica que 'type' y 'email' sean strings, de lo contrario se ignoran (undefined)
      const typeString = typeof type === 'string' ? type : undefined;
      const emailString = typeof email === 'string' ? email : undefined;
      // Se ejecuta el caso de uso, el cual ya mapea los timestamps
      const users = await this.getAllUsersUseCase.execute({
        type: typeString,
        email: emailString,
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
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      next(error);
    }
  };

  public create: RequestHandler = async (req, res, next) => {
    try {
      // 1) Interpretar req como RequestWithUser
      const reqWithUser = req as RequestWithUser;
      const payload = req.body as CreateUserDto;

      // 2) Crear el usuario (hash de password incluido)
      const newUser = await this.createUserUseCase.execute(payload);

      // 3) Asignaciones automáticas según rol del autor y tipo creado
      const reqUser = reqWithUser.user;
      if (reqUser?.userType === 'TUTOR' && payload.userType === 'STUDENT') {
        await this.addStudentToTutorUseCase.execute(reqUser.id, newUser.id);
      }
      if (
        reqUser?.userType === 'UNIVERSITY' &&
        payload.userType === 'INFOMANAGER'
      ) {
        await this.addInfoManagerToUniversityUseCase.execute(
          reqUser.id,
          newUser.id,
        );
      }
      if (reqUser?.userType === 'UNIVERSITY' && payload.userType === 'VIEWER') {
        await this.addViewerToUniversityUseCase.execute(reqUser.id, newUser.id);
      }

      // 4) Responder con el usuario creado
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  };

  public update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedUser = await this.updateUserUseCase.execute(id, req.body);
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
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id } = req.params;
      const wasDeleted = await this.deleteUserUseCase.execute(id);
      if (!wasDeleted) {
        res.status(404).json({ message: 'Usuario no encontrado' });
      } else {
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
      }
    } catch (error) {
      next(error);
    }
  };

  public getStudentsByTutor = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { id: tutorId } = req.params;
      const students = await this.getStudentsByTutorUseCase.execute(tutorId);
      res.status(200).json(students);
    } catch (err) {
      next(err);
    }
  };

  public getInfoManagersByUniversity = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const list = await this.getInfoManagersByUniversityUseCase.execute(id);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };

  public getViewersByUniversity = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const id = req.params.id;
      const list = await this.getViewersByUniversityUseCase.execute(id);
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
  };
}
