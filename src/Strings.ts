import { Topic } from "./EntitiesGroup/panels/topicPanel"


interface StringDictionary  {
    topics: {[name: string]: Topic}
}

const strings = {
    topics: {
        experiences: {
            topic: "Expériences professionnelles",
            content: [
                {
                    title: "Unissey",
                    subTitle: "Paris, avril 2020 - septembre 2021 : développeur informatique",
                    content: "Création de backend micro-services et d’une application mobile pour une plateforme de reconnaissance faciale. Création et gestion des tests automatisés de la plateforme et intégration et gestion des services d’authentification."
                },
                {
                    title: "SFR",
                    subTitle: "Paris, nov 2019 - mars 2020 : développeur informatique (stage)",
                    content: "Création de backend en micro-services dans le cadre d’un prototype d’un nouveau système. Création d’outils de manipulation de données (Kafka, Java)"
                },
                {
                    title: "Freelance",
                    subTitle: "août 2018 - septembre 2019 : développeur informatique",
                    content: "Création et maintenance de backends. Création d’une application mobile, Maintenance de site internet."
                },
                {
                    title: "Riminder",
                    subTitle: "Paris, avril 2018 - août 2018 (stage et freelance)",
                    content: "Amélioration et maintenance de backend. Création de clients d’API de multiples langages. Création d’une application de bureau."
                },
                {
                    title: "Socloz",
                    subTitle: "Paris, juillet 2016 - décembre 2016 (stage)",
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