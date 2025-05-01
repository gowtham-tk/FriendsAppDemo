FROM ruby:3.2 AS builder

RUN apt-get update -qq && apt-get install -y \
  build-essential \
  libpq-dev \
  nodejs \
  postgresql-client

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

FROM ruby:3.2-slim

RUN apt-get update -qq && apt-get install -y \
  libpq-dev \
  nodejs \
  postgresql-client \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /usr/local/bundle /usr/local/bundle

COPY . .

CMD ["bash", "-c", "rm -f tmp/pids/server.pid && rails server -b 0.0.0.0 -p 3001"]

EXPOSE 3001