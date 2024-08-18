/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/Auth/Auth.Sevice';
import { CategoryService } from 'src/Category/Category.service';
import { CreateCategoryDto } from 'src/Category/CreateCategory.dto';
import { EjercicioDto } from 'src/Ejercicios/CreateEjercicio.dto';
import { EjercicioService } from 'src/Ejercicios/Ejercicios.service';
import { DifficultyLevel } from 'src/PlanDeEntranmiento/difficultyLevel.enum';
import { Plan } from 'src/PlanDeEntranmiento/Plan.entity';
import { PlanService } from 'src/PlanDeEntranmiento/Plan.service';
import { RutinaService } from 'src/Rutina/Rutinas.Service';
import { CreateUserDto } from 'src/User/CreateUser.Dto';
import { Users } from 'src/User/User.entity';
import { UsersRepository } from 'src/User/User.repository';
import { UserService } from 'src/User/User.service';
import { Repository } from 'typeorm';

const ejercicios1: EjercicioDto[] = [
  {
    titulo: 'Dominadas',
    descripcion:
      'Estos ejercicios están enfocados en fortalecer los músculos de la espalda y los bíceps',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263913/rutina-para-masa-muscular_ee5yn9.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Burpees',
    descripcion:
      'Estos ejercicios combinan trabajo de fuerza y cardio para un entrenamiento completo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263935/woman-1284656_640_sc6p2l.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Flexiones',
    descripcion: 'Estos ejercicios trabajan el pecho, tríceps y hombros',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263930/SMVh-8GKw_2000x1500__1_limyou.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Zancadas',
    descripcion:
      'Estos ejercicios ayudan a fortalecer y tonificar las piernas y glúteos',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263879/rutina-masa-muscular_acibol.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Saltos de caja',
    descripcion:
      'Estos ejercicios mejoran la explosividad y la fuerza de las piernas',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722221475/m4cyxwkghibwa1e0jbuj.webp',
    ],
    videoUrl: '',
  },
];

const ejercicios2: EjercicioDto[] = [
  {
    titulo: 'Triceps',
    descripcion: 'Estos ejercicios se basan en trabajar los triceps',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263855/mujer-haciendo-ejercicio-de-levantamiento-de-pesas_tdjmwm.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Biceps',
    descripcion: 'Estos ejercicios se basan en trabajar los biceps',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263829/mujer-morena-atletica-haciendo-ejercicio-pesas-club-gimnasia_613910-16352_jdvoxm.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Sentadillas',
    descripcion:
      'Estos ejercicios se centran en fortalecer los músculos de las piernas y glúteos',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263674/mujer-adulta-joven-haciendo-ejercicios-fuerza-gimnasio_1153-4611_uiyf7a.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Press de banca',
    descripcion:
      'Estos ejercicios están diseñados para trabajar el pecho y los tríceps',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263660/joven-ropa-deportiva-clase-ejercicios-gimnasio_1150-12372_p3hwe7.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Peso muerto',
    descripcion:
      'Estos ejercicios son fundamentales para el desarrollo de la fuerza en la parte inferior del cuerpo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
    ],
    videoUrl: '',
  },
];

const ejercicios3: EjercicioDto[] = [
  {
    titulo: 'Box Jumps',
    descripcion:
      'Estos ejercicios mejoran la fuerza explosiva y la coordinación',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263650/gimnasio-gimnasio-ejercicio-hombre-listo-para-ejercicio-con-tetera-bell_hd2vs6.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Battle Ropes',
    descripcion:
      'Estos ejercicios son excelentes para el acondicionamiento cardiovascular y la fuerza de la parte superior del cuerpo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263597/entrenamiento-entrenamiento-deportivo-joven-hermosa-gimnasio_155003-41224_h6mf06.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Russian Twists',
    descripcion:
      'Estos ejercicios están diseñados para trabajar los oblicuos y el núcleo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263583/ejercicios-de-gimnasio-696x464.jpg_ch1rsk.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Pull-ups',
    descripcion:
      'Estos ejercicios son esenciales para el desarrollo de la fuerza en la parte superior del cuerpo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263614/gettyimages-653821928-2-669e262f6807d_n9mvwd.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Overhead Squats',
    descripcion:
      'Estos ejercicios combinan fuerza y estabilidad, trabajando principalmente las piernas y los hombros',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263554/ejercicio-basico-sentadillas_905x603_dxg3m3.webp',
    ],
    videoUrl: '',
  },
];

const ejercicios4: EjercicioDto[] = [
  {
    titulo: 'Kettlebell Swings',
    descripcion:
      'Estos ejercicios son excelentes para trabajar la cadera y la parte posterior del cuerpo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263449/culturista-femenina-entrenando-triceps-gimnasio_651396-310_dwth19.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Clean and Jerk',
    descripcion:
      'Estos ejercicios son movimientos olímpicos que trabajan todo el cuerpo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263378/captura-de-pantalla-2024-07-08-a-las-10-15-54-668ba04d1ef77_mbivoi.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Snatch',
    descripcion:
      'Estos ejercicios son movimientos olímpicos que mejoran la fuerza y la potencia',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263342/1503312524_654564_1503312763_noticia_normal_recorte1_fk6gsq.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Mountain Climbers',
    descripcion:
      'Estos ejercicios combinan cardio y fuerza, trabajando el núcleo y las piernas',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263325/450_1000_wu5ilc.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Remos con barra',
    descripcion:
      'Estos ejercicios están enfocados en trabajar los músculos de la espalda',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
    ],
    videoUrl: '',
  },
];

const ejercicios5: EjercicioDto[] = [
  {
    titulo: 'Jumping Jacks',
    descripcion:
      'Estos ejercicios son perfectos para calentar el cuerpo y mejorar la resistencia cardiovascular',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722221475/m4cyxwkghibwa1e0jbuj.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Plank',
    descripcion:
      'Estos ejercicios fortalecen el núcleo y mejoran la estabilidad y el equilibrio',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722215838/if0bnghyz2ngedrvji2y.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Lateral Lunges',
    descripcion:
      'Estos ejercicios trabajan los músculos de las piernas y mejoran la flexibilidad lateral',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722168731/oqm26mav3opy3ihr6r1v.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Push Press',
    descripcion:
      'Estos ejercicios combinan fuerza y potencia, trabajando los hombros y los tríceps',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722215838/if0bnghyz2ngedrvji2y.webp',
    ],
    videoUrl: '',
  },
  {
    titulo: 'Medicine Ball Slams',
    descripcion:
      'Estos ejercicios son excelentes para desarrollar fuerza explosiva y trabajar el núcleo',
    imgUrl: [
      'https://res.cloudinary.com/dae25mckx/image/upload/v1722263583/ejercicios-de-gimnasio-696x464.jpg_ch1rsk.webp',
    ],
    videoUrl: '',
  },
];

const entrenadores: CreateUserDto[] = [
  {
    name: 'Marco Antonio',
    email: 'mailentrenador1@mail.com',
    dni: 10000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Mendoza',
  },
  {
    name: 'Marco Aurelio',
    email: 'mailentrenador2@mail.com',
    dni: 20000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Mendoza',
  },
  {
    name: 'Matias Ottersttet',
    email: 'mailentrenador3@mail.com',
    dni: 30000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Santa Fe',
  },
  {
    name: 'Pablo Santana',
    email: 'mailentrenador4@mail.com',
    dni: 40000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Santa Fe',
  },
  {
    name: 'Carla Petroni',
    email: 'mailentrenador5@mail.com',
    dni: 50000000,
    password: '12345678aA!',
    passwordConfirm: '12345678aA!',
    phone: 2664404040,
    country: 'Argentina',
    address: 'Calle Falsa 123',
    city: 'Santa Fe',
  },
];

const usuarios: CreateUserDto[] = [
  {
    name: 'Lucía Fernández',
    email: 'dasbrotchen@gmail.com',
    dni: 25000001,
    password: '12345678!aA',
    passwordConfirm: '12345678!aA',
    phone: 2664455566,
    country: 'Argentina',
    address: 'Avenida Siempreviva 742',
    city: 'Buenos Aires',
  },
  {
    name: 'Joaquín Pérez',
    email: 'joaquin.perez@mail.com',
    dni: 25000002,
    password: 'SecurePass99!',
    passwordConfirm: 'SecurePass99!',
    phone: 2664411122,
    country: 'Argentina',
    address: 'Calle Mayor 456',
    city: 'Córdoba',
  },
  {
    name: 'Valentina López',
    email: 'valentina.lopez@mail.com',
    dni: 25000003,
    password: 'MyPassword1!',
    passwordConfirm: 'MyPassword1!',
    phone: 2664422233,
    country: 'Argentina',
    address: 'Boulevard Central 789',
    city: 'Rosario',
  },
  {
    name: 'Santiago Gómez',
    email: 'santiago.gomez@mail.com',
    dni: 25000004,
    password: 'StrongPass77!',
    passwordConfirm: 'StrongPass77!',
    phone: 2664433344,
    country: 'Argentina',
    address: 'Camino Real 101',
    city: 'La Plata',
  },
];

const categorias: CreateCategoryDto[] = [
  {
    name: 'Futbol',
  },
  {
    name: 'Basquet',
  },
  {
    name: 'Natacion',
  },
  {
    name: 'Tenis',
  },
  {
    name: 'Gimnasia',
  },
  {
    name: 'Ciclismo',
  },
  {
    name: 'Atletismo',
  },
  {
    name: 'Volley',
  },
  {
    name: 'Hockey',
  },
];

@Injectable()
export class SeederService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly userService: UserService,
    private readonly ejerciciosService: EjercicioService,
    private readonly authService: AuthService,
    private readonly categoryService: CategoryService,
    private readonly planesService: PlanService,
    private readonly rutinaService: RutinaService,
    @InjectRepository(Users)
    private readonly userRepositoryUser: Repository<Users>,
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}
  async addSeeders() {
    entrenadores.map(async (entrenador) => {
      await this.authService.signupEntrenador(entrenador);
    });

    usuarios.map(async (usuario) => {
      await this.authService.signup(usuario);
    });

    categorias.map(async (categoria) => {
      await this.categoryService.createCategory(categoria);
    });

    return 'categorias, entrenadores y usuarios creados';
  }

  async addSeeders2() {
    const email1 = 'mailentrenador1@mail.com';
    const entrenador1 = await this.userService.getUserByEmail(email1);
    const email2 = 'mailentrenador2@mail.com';
    const entrenador2 = await this.userService.getUserByEmail(email2);
    const email3 = 'mailentrenador3@mail.com';
    const entrenador3 = await this.userService.getUserByEmail(email3);
    const email4 = 'mailentrenador4@mail.com';
    const entrenador4 = await this.userService.getUserByEmail(email4);
    const email5 = 'mailentrenador5@mail.com';
    const entrenador5 = await this.userService.getUserByEmail(email5);

    const id1 = entrenador1.id;
    const id2 = entrenador2.id;
    const id3 = entrenador3.id;
    const id4 = entrenador4.id;
    const id5 = entrenador5.id;

    console.log(id1, id2, id3, id4, id5);

    ejercicios1.map(async (ejercicio) => {
      await this.ejerciciosService.createEjercicio(ejercicio, id1);
    });
    ejercicios2.map(async (ejercicio) => {
      await this.ejerciciosService.createEjercicio(ejercicio, id2);
    });
    ejercicios3.map(async (ejercicio) => {
      await this.ejerciciosService.createEjercicio(ejercicio, id3);
    });
    ejercicios4.map(async (ejercicio) => {
      await this.ejerciciosService.createEjercicio(ejercicio, id4);
    });
    ejercicios5.map(async (ejercicio) => {
      await this.ejerciciosService.createEjercicio(ejercicio, id5);
    });

    return 'ejercicios creados';
  }

  async addSeeders3() {
    const categorias = await this.categoryService.getCategorys();
    const email1 = 'mailentrenador1@mail.com';
    const email2 = 'mailentrenador2@mail.com';
    const email3 = 'mailentrenador3@mail.com';
    const email4 = 'mailentrenador4@mail.com';
    const email5 = 'mailentrenador5@mail.com';
    const entrenador1 = await this.userService.getUserByEmail(email1);
    const entrenador2 = await this.userService.getUserByEmail(email2);
    const entrenador3 = await this.userService.getUserByEmail(email3);
    const entrenador4 = await this.userService.getUserByEmail(email4);
    const entrenador5 = await this.userService.getUserByEmail(email5);
    // const admin = entrenador1;
    const categoria1 = categorias[0];
    const categoria2 = categorias[1];
    const categoria3 = categorias[2];
    const categoria4 = categorias[3];
    const categoria5 = categorias[4];
    const categoria6 = categorias[5];
    const categoria7 = categorias[6];
    const categoria8 = categorias[7];
    const categoria9 = categorias[8];
    const planes = [
      {
        name: 'Plan de entrenamiento de piernas',
        category: [categoria1, categoria2],
        description:
          'Este plan es ideal para tonificar de manera integral tu tren inferior. Ganar estabilidad.',
        location: 'Tucuman',
        difficultyLevel: DifficultyLevel.AVANZADO,
        admin: entrenador1,
        price: 500,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento cardiovascular',
        category: [categoria3, categoria4],
        description:
          'Este plan es ideal para trabajar todo el sistema cardiovascular. Ganar resistencia.',
        location: 'Tucuman',
        difficultyLevel: DifficultyLevel.INICIAL,
        admin: entrenador1,
        price: 600,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento funcional',
        category: [categoria1, categoria2],
        description:
          'Este plan está pensado para un desarrollo integral del cuerpo y la movilidad',
        location: 'Cali',
        difficultyLevel: DifficultyLevel.INTERMEDIO,
        admin: entrenador2,
        price: 700,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento de brazos',
        category: [categoria3, categoria4],
        description:
          'Este plan es ideal para trabajar todo el torso superior. Ganar resistencia y fuerza.',
        location: 'Cali',
        difficultyLevel: DifficultyLevel.INICIAL,
        admin: entrenador2,
        price: 800,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento funcional',
        category: [categoria7, categoria3],
        description:
          'Este plan está pensado para un desarrollo integral del cuerpo y la movilidad',
        location: 'Buenos Aires',
        difficultyLevel: DifficultyLevel.INTERMEDIO,
        admin: entrenador3,
        price: 900,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento de brazos',
        category: [categoria3, categoria4],
        description:
          'Este plan es ideal para trabajar todo el torso superior. Ganar resistencia y fuerza.',
        location: 'Buenos Aires',
        difficultyLevel: DifficultyLevel.INTERMEDIO,
        admin: entrenador3,
        price: 10,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento funcional',
        category: [categoria7, categoria3],
        description:
          'Este plan está pensado para un desarrollo integral del cuerpo y la movilidad',
        location: 'Cordoba',
        difficultyLevel: DifficultyLevel.AVANZADO,
        admin: entrenador4,
        price: 500,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento de pecho y espalda',
        category: [categoria9, categoria1],
        description:
          'Este plan es ideal para trabajar todo el torso superior. Ganar resistencia y fuerza.',
        location: 'Cordoba',
        difficultyLevel: DifficultyLevel.AVANZADO,
        admin: entrenador4,
        price: 500,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de estiramiento',
        category: [categoria2, categoria5, categoria6],
        description:
          'Este plan está pensado para trabajar el estiramiento muscular.',
        location: 'Mendoza',
        difficultyLevel: DifficultyLevel.INICIAL,
        admin: entrenador5,
        price: 500,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
      {
        name: 'Plan de entrenamiento de la flexibilidad',
        category: [categoria8, categoria9],
        description:
          'Este plan es ideal para trabajar la flexibilidad y la resistencia de todo tu cuerpo',
        location: 'Mendoza',
        difficultyLevel: DifficultyLevel.INICIAL,
        admin: entrenador5,
        price: 500,
        latitude: -32.892479,
        longitude: -68.863985,
        imgUrl:
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263303/5bfbcbd90de69431253497ff-8-ejercicios-para-novatos-en-el-gimnasio_hcjwfl.webp',
        videoUrl: [
          'https://res.cloudinary.com/dae25mckx/image/upload/v1722263629/GettyImages-1090188000_cmd2gn.webp',
        ],
      },
    ];
    console.log(categoria1, categoria2);
    console.log(planes);
    await Promise.all(planes.map((plan) => this.planRepository.save(plan)));
    return 'planes creados';
  }

  async addSeeders4() {
    return 'rutinas creadas';
  }
}
