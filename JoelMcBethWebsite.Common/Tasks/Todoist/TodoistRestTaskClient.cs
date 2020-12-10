namespace JoelMcBethWebsite.Tasks.Todoist
{
    using System;
    using System.Collections.Generic;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Text.Json;

    public class TodoistRestTaskClient : ITaskClient
    {
        private readonly string token;

        public TodoistRestTaskClient(string token)
        {
            this.token = token;
        }

        public async Task<List<TodoTask>> GetTasksAsync(CancellationToken cancellationToken = default)
        {
            var url = new Uri("https://api.todoist.com/rest/v1/tasks");

            using (var client = new HttpClient())
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", this.token);

                var response = await client.GetStringAsync(url);

                return JsonSerializer.Deserialize<List<TodoTask>>(response);
            }
        }
    }
}
