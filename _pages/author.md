---
layout: page
title: Author
permalink: /author/
description: "Profile for Al Khaleej, editor of Dubai Time."
---

## About Al Khaleej

Al Khaleej is the editor behind Dubai Time, with a focus on UAE transport, local services, visa guidance, banking explainers, and practical city guides.

## Focus Areas

- Dubai and UAE public transport
- Visa, ID, and administrative guides
- Banking and day-to-day city services

## Credentials and Contact

- Lead editor, Dubai Time
- Public academic profile on [Google Scholar](https://scholar.google.com/citations?hl=en&user=zLa9Up4AAAAJ)
- Editorial contact: [adubaitime@gmail.com](mailto:adubaitime@gmail.com)

## Latest Articles

{% assign author_posts = "" | split: "" %}
{% for post in site.posts %}
  {% assign mapped_author = site.authors[post.author].display_name | default: post.author %}
  {% if mapped_author == "Al Khaleej" %}
    {% assign author_posts = author_posts | push: post %}
  {% endif %}
{% endfor %}

<ul>
{% for post in author_posts limit: 10 %}
  <li><a href="{{ post.url | relative_url }}">{{ post.title }}</a> - {{ post.date | date: "%B %-d, %Y" }}</li>
{% endfor %}
</ul>
