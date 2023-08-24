import { json } from "co-body";

export async function getUserName(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { vbase },
  } = ctx;

  ctx.body = await vbase
    .getJSON<{ userName: string }>("configs", "userName")
    .then((res) => res)
    .catch((e) => {
      if (e.response.statusText === "Not Found") {
        console.log("File Not Found --> ", e.response.data);
      } else {
        console.log("Vbase Error --> ", e.response.data);
      }

      return null;
    });
  ctx.status = 200;

  await next();
}

export async function saveUserName(ctx: Context, next: () => Promise<void>) {
  const {
    clients: { vbase },
  } = ctx;

  const { userName } = await json(ctx);

  const result = await vbase
    .saveJSON<{ userName: string }>("configs", "userName", { userName })
    .then((__) => "success");

  if (result === "success") {
    ctx.body = result;
    ctx.status = 200;
  } else {
    ctx.body = "ERROR";
    ctx.status = 400;
  }

  await next();
}
