import graphene
from sqlalchemy import create_engine, MetaData, Table, Column, Integer, String

meta = MetaData()
engine = create_engine('sqlite:///todo.db', echo=True)

todo = Table("todo", meta, Column("id", Integer, primary_key=True),
             Column("todo", String))

meta.create_all(engine)
conn = engine.connect()

# ins = todo.insert().values(todo="dishes")
# result = conn.execute(ins)
# x = todo.select()
# result = conn.execute(x)
# for i in result:
#     print(i)


class todoo(graphene.ObjectType):
    id = graphene.ID()
    task = graphene.String()


class CreateTodo(graphene.Mutation):
    class Arguments:
        task = graphene.String()

    todos = graphene.Field(todoo)

    def mutate(root, info, task):
        todos = todoo(task=task)
        x = todo.insert().values(todo=task)
        conn.execute(x)
        return CreateTodo(todos=todos)


class DelTodo(graphene.Mutation):
    class Arguments:
        id = graphene.Int()

    ok = graphene.Boolean()

    def mutate(root, info, id):
        conn.execute(todo.delete().where(todo.c.id == id))
        ok = True
        return DelTodo(ok=ok)


class UpdateTodo(graphene.Mutation):
    class Arguments:
        id = graphene.Int()
        task = graphene.String()

    ok = graphene.Boolean()

    def mutate(root, info, id, task):
        x = todo.update().where(todo.c.id == id).values(todo=task)
        conn.execute(x)
        return UpdateTodo(ok=True)


class Mutations(graphene.ObjectType):
    TodoCreate = CreateTodo.Field()
    TodoDel = DelTodo.Field()
    UpdateTodos = UpdateTodo.Field()


class Query(graphene.ObjectType):
    todo = graphene.String(id=graphene.Int(default_value="1"))
    todolist = graphene.List(graphene.String)

    def resolve_todolist(root, info):
        lst = []
        x = todo.select()
        result = conn.execute(x)
        for i in result:
            lst.append(i[1])
        return lst

    def resolve_todo(root, info, id):
        x = todo.select().where(todo.c.id == id)
        result = conn.execute(x)
        for i in result:
            print(i)
            return f"task={i[1]}"


schema = graphene.Schema(query=Query, mutation=Mutations)

# result = schema.execute('''
# mutation myfirstMutation{
#     TodoCreate(task:"code"){
#         todos{
#             task
#         }
#     }
#     }

# ''')

# print(result.data)

# result = schema.execute('''
# mutation delmutation{
#     UpdateTodos(id:1,task:"man makers"){
#      ok
#     }
# }
# ''')
# print(result.data)

# result = schema.execute('''
# {
#     todolist
# }
# ''')
# print(result.data)