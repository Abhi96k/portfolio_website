import {
  SiTypescript, SiJavascript, SiPython, SiScala, SiMysql, SiNodedotjs, SiExpress, SiSpringboot,
  SiRabbitmq, SiApachekafka, SiRedis, SiGraphql, SiReact, SiRedux, SiNextdotjs, SiStorybook,
  SiTailwindcss, SiDocker, SiKubernetes, SiPostgresql, SiMongodb, SiPrometheus, SiGithubactions,
  SiCypress, SiPytorch, SiHuggingface, SiScikitlearn, SiLeetcode, SiGeeksforgeeks, SiHackerrank,
  SiWebrtc, SiJsonwebtokens,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import {
  LuServer, LuVideo, LuNetwork, LuBrain, LuCode, LuBraces,
} from "react-icons/lu";

export const techIcons = {
  java: FaJava, typescript: SiTypescript, javascript: SiJavascript, python: SiPython, scala: SiScala,
  mysql: SiMysql, node: SiNodedotjs, express: SiExpress, spring: SiSpringboot, rabbitmq: SiRabbitmq,
  kafka: SiApachekafka, redis: SiRedis, graphql: SiGraphql, api: LuBraces, react: SiReact, redux: SiRedux,
  next: SiNextdotjs, storybook: SiStorybook, tailwind: SiTailwindcss, aws: FaAws, docker: SiDocker,
  kubernetes: SiKubernetes, postgres: SiPostgresql, mongodb: SiMongodb, prometheus: SiPrometheus,
  actions: SiGithubactions, cypress: SiCypress, pytorch: SiPytorch, huggingface: SiHuggingface,
  sklearn: SiScikitlearn, leetcode: SiLeetcode, gfg: SiGeeksforgeeks, hackerrank: SiHackerrank,
  webrtc: SiWebrtc, jwt: SiJsonwebtokens, video: LuVideo, tree: LuNetwork, brain: LuBrain,
  code: LuCode, server: LuServer,
};

export function TechIcon({ name, size = 18, ...rest }) {
  const Icon = techIcons[name] || LuCode;
  return <Icon size={size} aria-hidden="true" {...rest} />;
}
