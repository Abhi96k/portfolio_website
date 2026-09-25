import {
  SiTypescript, SiJavascript, SiPython, SiScala, SiMysql, SiNodedotjs, SiExpress, SiSpringboot,
  SiRabbitmq, SiApachekafka, SiRedis, SiGraphql, SiReact, SiRedux, SiNextdotjs, SiStorybook,
  SiTailwindcss, SiDocker, SiKubernetes, SiPostgresql, SiMongodb, SiPrometheus, SiGithubactions,
  SiCypress, SiPytorch, SiHuggingface, SiScikitlearn, SiLeetcode, SiGeeksforgeeks, SiHackerrank,
  SiWebrtc, SiJsonwebtokens, SiJest, SiTestinglibrary, SiHelm, SiGooglechrome, SiDeepgram, SiApache,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa6";
import {
  LuServer, LuVideo, LuNetwork, LuBrain, LuCode, LuBraces, LuChartLine, LuTable, LuLanguages,
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
  code: LuCode, server: LuServer, jest: SiJest, rtl: SiTestinglibrary, helm: SiHelm, chrome: SiGooglechrome,
  voice: SiDeepgram, apache: SiApache, chart: LuChartLine, table: LuTable, i18n: LuLanguages,
};

export function TechIcon({ name, size = 18, ...rest }) {
  const Icon = techIcons[name] || LuCode;
  return <Icon size={size} aria-hidden="true" {...rest} />;
}
