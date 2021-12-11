import { VERSION } from "./info.ts";
import { Command, Notification, ProgressBar, ValidationError } from "./deps.ts";
import { Minutes, Seconds } from "./time.ts";

interface Options {
  progressBar: Boolean;
  desktopNotification: Boolean;
  duration: Minutes;
}

const { options } = await new Command()
  .name("pom")
  .version(VERSION)
  .description("A calm pomodoro timer cli.")
  .option("--duration <duration:integer>", "Duration in minutes", {
    default: 25,
    value: (value: number): Minutes => {
      if (value < 0) {
        throw new ValidationError(
          `Duration must be greater than 0, but go ${value}.`,
        );
      }
      return new Minutes(value);
    },
  })
  .option(
    "--no-progress-bar",
    "Hide the progress bar that shows how much time is left.",
  )
  .option(
    "--no-desktop-notification",
    "Do not show a desktop notification when the time is up.",
  )
  .parse(Deno.args);

function delay(s: Seconds) {
  return new Promise((resolve) => setTimeout(resolve, s.showSeconds() * 1000));
}

async function notify(message: string) {
  const notif = new Notification()
    .title(message)
    .show();
}

async function activateTimer(options: Options): Promise<any> {
  const pomodoroDuration = options.duration.showSeconds();

  const progressBar = new ProgressBar({
    total: pomodoroDuration,
    display: ":bar",
  });

  let timePassed = 0;
  const refreshInterval: Seconds = new Seconds(1);
  while (timePassed < pomodoroDuration) {
    await delay(refreshInterval);
    timePassed += refreshInterval.showSeconds();

    if (options.progressBar) progressBar.render(timePassed);
  }

  if (options.desktopNotification) notify("You are done!");
}

activateTimer(options);
