import { TextWithCallback } from "./EntitiesGroup/panels/TextPanel";
import { Topic } from "./EntitiesGroup/panels/topicPanel"


interface StringDictionary  {
    topics: {[name: string]: Topic},
    contact: TextWithCallback[]
    singleStrings: {[name: string]: string}
    projects: {[name: string]: {title: TextWithCallback, desc: string}}
}

const strings = {
    projects: {
        view3: {
            title: {
                str: "View 3R ↗",
                cb: () => {
                    window.open("https://github.com/Xalrandion/View3R", "_blank").blur();
                }
            },
            desc: "Un simple outil de creation de scene 3D avec des primitives (wip)"
        },
        raytracing: {
            title: {
                str: "raytracer ↗",
                cb: () => {
                    window.open("https://github.com/Xalrandion/learning-raytracing", "_blank").blur();
                }
            },
            desc: "Un simple raytracer pour en comprendre le fonctionnement"
        },
        vrcv: {
            title: {
                str: "VR-CV ↗",
                cb: () => {
                    window.open("https://github.com/Xalrandion/VR-CV", "_blank").blur();
                }
            },
            desc: "Vous êtes ici ↓"
        },
        slam: {
            title: {
                str: "S.L.A.M",
                cb: () => { },
            },
            desc: "Un simple slam pour en comprendre le fonctionnement (coming soon)"
        },
    },
    singleStrings: {
        contactPanelTitle: "Contact",
        welcomePanelTitle: "Bienvenue dans mon CV VR !",
        welcomePanelText1: "Je suis développeur informatique, j'ai 24 ans, et suis passionné de technologie XR. Je suis déterminé à devenir expert dans le domaine. J’ai commencé mon parcours professionnel en travaillant avec succès comme développeur backend.", 
        welcomePanelText2: 'L\'univers de la réalité virtuelle m’ayant toujours intéressé j’ai décidé m’y consacrer pleinement. Mon objectif est de participer à des projets ambitieux et innovants dans le domaine.',
        welcomePanelText3: 'Mon objectif est de participer des projet ambitieux et innovants dans le domaine.'
    },
    watchProjectStation: [
        {
            str: "N’hésitez pas à jeter un coup d'œil à mes projets sur les murs de cet espace !",
            cb: () => {}
        }
    ],
    contact: [
        {
            str: "E-mail: gotte.alexandre@gmail.com ↗",
            cb: () => {
                window.open("mailto:gotte.alexandre@gmail.com", "_blank").blur();
            } 
        },
        {
            str: "LinkedIn: linkedin.com/in/alexandre-gotte ↗",
            cb: () => {
                window.open("https://www.linkedin.com/in/alexandre-gotte/", "_blank").blur();
            }
        },
        {
            str: "Github: github.com/Xalrandion ↗",
            cb: () => {
                window.open("https://github.com/Xalrandion", "_blank").blur();
            }
        },
    ],
    topics: {
        experiences: {
            topic: "Expériences professionnelles:",
            content: [
                {
                    title: "Unissey",
                    subTitle: "Paris, avril 2020 - septembre 2021 : développeur",
                    content: "Création de backend micro-services et d’une application mobile pour une plateforme de reconnaissance faciale. Création et gestion des tests automatisés de la plateforme, intégration et gestion des services d’authentification."
                },
                {
                    title: "SFR",
                    subTitle: "Paris, nov 2019 - mars 2020 : développeur (stage)",
                    content: "Création de backend en micro-services dans le cadre d’un prototype d’un nouveau système. Création d’outils de manipulation de données (Kafka, Java)"
                },
                {
                    title: "Freelance",
                    subTitle: "août 2018 - septembre 2019 : développeur",
                    content: "Création et maintenance de backends. Création d’une application mobile, Maintenance de site internet."
                },
                {
                    title: "Riminder",
                    subTitle: "Paris, avril 2018 - août 2018 : développeur (stage et freelance)",
                    content: "Amélioration et maintenance de backend. Création de clients d’API de multiples langages. Création d’une application de bureau."
                },
                {
                    title: "Socloz",
                    subTitle: "Paris, juillet 2016 - décembre 2016 : développeur (stage)",
                    content: "Migration de services vers un backend en GO. Création d’outils de manipulation de données pour divers clients."
                }
            ]
        },
        skills: {
            topic: "Compétences",
            content: [
                {
                    title: "Languages de programmation",
                    content: "C / C++ / Kotlin / Golang / Python / Java / asm (notions)"
                },
                {
                    title: "Moteur de jeux",
                    content: "Unreal engine 4 / Unity"
                },
                {
                    title: "Technologies web",
                    content: "JavaScript / Typescript / React / NodeJS"
                },
                {
                    title: "Android",
                    content: "Kotlin"
                },
                {
                    title: "Base de donnée",
                    content: "SQL /  No-SQL"
                },
                {
                    title: "GIT",
                    content: ""
                },
                {
                    title: "Technologies DevOps",
                    content: "Docker / Kubernetes"
                },
                {
                    title: "Environnement de travail",
                    content: "Windows / Linux"
                }
            ]
        },
        education: {
            topic: "Education",
            content: [
                {
                    title: "Epitech Paris",
                    subTitle: "Paris, 2015 - 2020:  master expert en informatique",
                    content: ""
                },
                {
                    title: "MOOC",
                    subTitle: "Paris, 2021 - 2022",
                    content: "Mathematics for Machine Learning / Extended Reality for Everybody / Introduction to Augmented Reality and ARCore"
                },
                {
                    title: "Stockholm university, Department of Computer and Systems Sciences",
                    subTitle: "Stockholm, 2018 - 2019",
                    content: "Data sciences, gestion de projet, design de produit."
                },
            ]
        },
        languages: {
            topic: "Langues",
            content: [
                {
                    title: "Français",
                    content: "Langue maternelle"
                },
                {
                    title: "Anglais",
                    content: "Niveau C2"
                },
            ]
        }
    }   
}

export {strings}; 